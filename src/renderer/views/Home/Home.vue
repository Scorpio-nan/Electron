<template>
    <div class="Home">
        <div class="container-header">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item>
                    <el-button type="primary" @click="onOpenDirectory">
                        选择目录
                    </el-button>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="form.filepath" readonly=""></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="container-main">
            <div class="table-layout">
                <div class="table-row" v-for="(item,index) in fileList" :key="index">
                    <div class="table-cell projectName" :title="item.fullpath">
                        {{ item.projectName }}
                    </div>
                    <div class="table-cell packageJson" title="可执行脚本">
                        <el-select v-model="item.script" placeholder="请选择" style="margin-left:15px;">
                            <el-option
                                v-for="run in item.scripts"
                                :key="run.key"
                                :label="run.label"
                                :value="run.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="table-cell action">
                        <el-button type="primary" v-if="!item.isrunning" :loading="item.loading" @click="startSrver(item)">启动服务</el-button>
                        <el-button type="warning" v-else @click="stopServer(item)">停止服务</el-button>
                    </div>
                    <div class="table-cell commond" >
                        {{ item.commond }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fs from 'fs';
    import path from 'path';
    import { remote } from 'electron';
    import { excludesDir } from '@/config/directory';
    import { exec } from 'child_process';
    import { promisify } from 'util';
    // import shell from 'shelljs';

    export default {
        name: "Home",
        data() {
            return {
                fileList: [],
                form: {
                    filepath: ""
                },
                directorys: [],
                excludesDir: excludesDir()
            }
        },
        created() {
            
        },
        methods: {
            /**
             * 打开目录选择的对话框
             */
            async onOpenDirectory() {
                const result = await remote.dialog.showOpenDialog({
                    properties: ['openDirectory']
                })
                if (result) this.form.filepath = result[0];

                this.fileList = this.readFileList(this.form.filepath);
                console.log(this.fileList);

            },
            /**
             * 递归读取目录下面所有的项目, 只要有带 package.json 的就是工程项目;
             */
            readFileList(dir) {
                const files = fs.readdirSync(dir);
                for (let i = 0; i < files.length; i++) {
                    var fullpath = path.join(dir, files[i]);
                    /**
                     * 判断目录还是文件
                     */
                    const stat = fs.statSync(fullpath);
                    if (stat.isDirectory()) {
                        /**
                         * 过滤掉不需要进行递归查找的目录
                         */
                        if (this.excludesDir.includes(files[i])) continue;
                        this.readFileList(fullpath);
                    } else {
                        if (files[i] === 'package.json') {
                            const dicname = fullpath.split("\\");
                            const npmmanager = JSON.parse(fs.readFileSync(dicname.join("\\"),'utf8'));
                            const scripts = this.optionValues(npmmanager);
                            let yarndev = Object.assign([],dicname);
                                yarndev.pop();
                                
                            this.directorys.push({
                                projectName: dicname[dicname.length - 2],
                                packageJson: dicname[dicname.length - 1],
                                fullpath: dicname.join("\\"),
                                scripts:scripts,
                                script: scripts[0] && scripts[0].label,
                                isrunning: false,
                                loading: false,
                                commond:"",
                                yarnPath: yarndev.join('\\'),
                                child:null
                            })
                        }
                    }
                }
                return this.directorys;
            },
            /**
             * 将 package.json 里面的 scripts 字段组织成 options 需要的数据
             */
            optionValues(npmmanager){
                var arr = [];
                for(var key in npmmanager.scripts){
                    arr.push({
                        key: key,
                        value: npmmanager.scripts[key],
                        label: key
                    })
                }
                return arr;
            },
            /**
             * 开启服务
             */
            async startSrver(item){
       
                if(item.scripts.length && item.script != ''){
                    let self = this;
                    item.loading = true;
                    item.child = exec(`yarn run ${item.script}`,{ cwd: item.yarnPath },function(err,stdout,stderr){
                        if(err){
                            self.stopServer(item);
                            self.$notify.error({
                                title: '发生错误!',
                                message: err
                            });
                        }else{
                            item.loading = false;
                            item.isrunning = true;
                            item.commond = stdout;
                        }
                        console.log('error:',err,'stdout:',stdout,'stderr:', stderr);
                    })
                    console.log(item.child);
                }

                
                /** 
                if(item.scripts.length && item.script != ''){
                    let self = this;
                    item.loading = true;
                    // shell.cd(item.yarnPath);
                    // shell.config.execPath = item.yarnPath;

                    item.child = shell.exec(`yan run ${item.script}`,{ slient:false });
                    console.log(item.child);
                    return;
                    item.child.stdout.on("data",function(data){
                        item.commond = data;
                        item.loading = false;
                        item.isrunning = true;
                    })
                }
                */
               
            },
            /**
             * 停止服务
             */
            stopServer(item){
                item.child.kill("SIGINT");
                // item.child.exit();
                item.isrunning = false;
                item.loading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefix:"table";
    .Home {
        height: 100%;
        display: flex;
        flex-direction: column;

        .container-main {
            flex: 1;
            overflow-y:scroll;
        }
        .#{$prefix}{
            &-layout{
                display: table;
                width: 100%;
            }
            &-row{
                display: table-row;
            }
            &-cell{
                display: table-cell;
                padding: 10px 0;
                border-bottom: 1px solid #e6e6e6;
                border-right: 1px solid #e6e6e6;
            }
        }
        .projectName{
            width: 350px;
        }
        .packageJson{
            width: 300px;
        }
        .action{
            text-align: center;
            width: 180px;
        }
        .commond{
            padding: 10px 15px;
            overflow-y: scroll;
        }
    }
</style>