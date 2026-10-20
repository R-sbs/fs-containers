# Use node:24 as the base image
FROM node:24 

WORKDIR /c/Users/Lenovo/Documents/GitHub/fs-containers/todo-app/todo-backend

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start

# FROM instruction tells Docker that the base for the image is node:24. COPY instruction copies the file index.js from the host machine to the file with the same name in the image. The CMD instruction specifies the default command that runs when you start a container with docker run. We are using the exec form CMD ["node", "index.js"] that runs the node executable with index.js as its argument.

# The WORKDIR instruction was slipped in to ensure we don't interfere with the contents of the image. It will guarantee all of the following commands will have /usr/src/app set as the working directory. If the directory doesn't exist in the base image, it will be automatically created.

