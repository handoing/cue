#lerna-start

```bash
lerna create module-1 # 在packages创建pkg-name项目
lerna add module-1 # 安装module-1依赖在packages下所有项目中
lerna add module-1 --scope=module-2 # 安装module-1依赖在packages/module-2项目中
lerna bootstrap # 安装所有包的依赖
lerna run build # 运行所有包里的script命令
lerna clean # 删除所有项目依赖
```