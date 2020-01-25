mkdir -p ~/run
nohup ./taskall &> /dev/null & echo $! > ~/run/taskall.pid
