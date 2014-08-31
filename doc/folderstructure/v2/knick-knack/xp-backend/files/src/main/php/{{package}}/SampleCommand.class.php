<?php namespace {{package}};

  use util\cmd\Command;

  class SampleCommand extends Command {
    private
      $log = null;

    public function run() {
      //application logic goes here
    }

    #[@inject(type = 'util.log.LogCategory', name = 'default')]
    public function setTrace($log) {
      $this->log= $log;
    }
    
  }
