FROM node:18.16.0 as devcontainer

RUN apt-get -yqq update && \
        apt-get -yqq install less gnupg software-properties-common curl

# Set up everything needed for vscode/extensions to work
RUN mkdir -p /home/node/.vscode-server/extensions \
        /home/node/.vscode-server-insiders/extensions \
    && chown -R node /home/node/.vscode-server \
        /home/node/.vscode-server-insiders

RUN git config --system core.editor "code --wait" && git config --system core.pager "less"

ENTRYPOINT ["/bin/sh", "-c", "while sleep 60000; do :; done"]