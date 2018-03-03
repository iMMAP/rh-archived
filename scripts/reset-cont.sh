#!/bin/bash
CONTAINERS=$(docker ps -a -q --filter="name=reporthub" --format="{{.ID}}")
STOPEDCONTAINERS=$(docker ps -q -f status=exited)

if [ -n "$CONTAINERS" ]; then
        RMCONTAINERS=$(docker stop $CONTAINERS)
				echo "ReportHub containers stopped"
        if [ -n "$RMCONTAINERS" ]; then
                docker rm $RMCONTAINERS
								echo "ReportHub containers removed"
        fi
fi

if [ -n "$STOPEDCONTAINERS" ]; then
        docker rm $STOPEDCONTAINERS
				echo "Other stopped containers removed"
fi