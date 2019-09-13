# the-f2e-w9-note-app

終於最後一週啦...

礙於對tiptap不太熟，所以沒有實作檔案存取於note裡面的設計，而且以offline功能來說也沒有很需要((?

使用了storybook進行component的開發，蠻方便使用的，加上一些功能實作方面設計，可以不用上serving，就可以看component運行效果

不是很想做到使用local儲存，因為cover的關係，預估local storage存取會超過2M

以下是預估會有的feature

- [ ] 可以使用markdown語法編輯

- [ ] 可以自定義cover

- [ ] 可以export/import筆記檔案


[設計稿](https://challenge.thef2e.com/user/1600?schedule=4259#works-4259)

[預覽網址](https://tianyili.github.io/the-f2e-w9-note-app)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
