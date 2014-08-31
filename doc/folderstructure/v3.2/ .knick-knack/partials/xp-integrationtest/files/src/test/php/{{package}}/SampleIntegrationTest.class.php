<?php namespace {%= package %}
  
  use unittest\TestCase;
  use unittest\mock\MockRepository;
  
  class SampleTest extends TestCase {
    private 
      $sut = null;
    
    public function setUp() {
      $this->mocks = new MockRepository();
      //TODO $this->sut = new Sample();
    }
    
    #[@test]
    public function can_construct() {
      //TODO new Sample();
    }
    
    #[@test]
    public function can_TODO() {
      $pm = PropertyManager::getInstance();
      $pm->configure('src/main/etc/default');
      $pm->configure('src/main/etc/dev');
      //TODO
    }
  }