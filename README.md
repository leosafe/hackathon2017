# Bardo (Hackathon 2017)

O projeto está em vue.js (https://vuejs.org) e usa Node.js v8.0+

## Build Setup

``` bash
# set node version with NVM to 8.0 (https://github.com/creationix/nvm)
nvm use

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Estrutura
```
.
├── build        # arquivo para build em dist e servir o projeto em dev na 8080
├── config       # variaveis de env
├── dist         # arquivos compilados para prod
├── src          # projeto
    ├── assets   # dependencias de arquivos (caminho gerado no build)
    ├── compoenents   # componentes do projeto
    ├── router   # routing
    ├── store    # store do vuex (equivalente do redux)
    ├── styles   # sass do projeto
├── static       # pasta gerada com caminho estatico para ser usado quando necessario
├ index.html   # arquivo principal

```
