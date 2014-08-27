from fabric.api import *

@task
def start():
  sudo('/etc/init.d/<insert-service> start')

@task
def stop():
  sudo('/etc/init.d/<insert-service> stop')

@task
def restart():
  sudo('/etc/init.d/<insert-service> restart')

@task(default=True)
def status():
  sudo('/etc/init.d/<insert-service> status')
