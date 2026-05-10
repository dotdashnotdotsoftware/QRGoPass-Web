FROM alpine:3.19
RUN touch /message.txt
CMD cat /message.txt
