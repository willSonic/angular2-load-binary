
docker build -t angular2-library-binary .
docker run -it --name rxjs-chat -v "$PWD":/data -w /data angular2-rxjs-chat

