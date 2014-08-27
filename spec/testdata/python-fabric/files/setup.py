import sys

from fabric.api import *
from fabric.contrib import *

import {%= name %}

@task(default=True)
def system():
  print 'start here'

