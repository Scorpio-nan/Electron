/**
 * 过滤掉不进行遍历的目录
 * @returns 
 */
export function excludesDir(){
    return [
        '.git',
        'node_modules',
        '.vs',
        '.electron-vue',
        'test',
        'less',
        'electron-webui-tool'
    ]
}