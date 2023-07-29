const fs = require('fs');
const yaml = require('yaml');
const git = require('simple-git')();

const filePath = './main.yml';  // 路径根据实际情况调整

// 读取并解析 YAML 文件
const file = fs.readFileSync(filePath, 'utf8');
let doc = yaml.parseDocument(file);

// 从 YAML 文件中获取当前版本号，并增加
let version = doc.get('version');
let versionParts = version.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;  // 假设我们在增加版本的修订号
let newVersion = versionParts.join('.');

// 更新版本号
doc.set('version', newVersion);
if (doc.errors.length > 0) {
    console.error('Errors in YAML document:', doc.errors);
} else {
    fs.writeFileSync(filePath, doc.toString());
}


// 提交并推送
git.add(filePath)
    .commit(`Bump version to ${newVersion}`)
    .push('origin')
    .then(() => console.log(`Pushed new version ${newVersion} to origin`))

// 创建新的 git 标签并推送
git.addTag(`v${newVersion}`)
    .pushTags('origin')
    .then(() => console.log(`Pushed new tag v${newVersion} to origin`))
    .catch((err) => console.error('Failed to push new tag:', err));
