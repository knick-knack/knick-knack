<?php namespace {%= package %}
  
  use {%= package %}.Sample;
  use unittest\TestCase;
  use unittest\mock\arguments\Arg;
  use unittest\mock\MockRepository;
  
  class SampleTest extends TestCase {
    private 
      $sut = null;
    
    public function setUp() {
      $this->sut = new Sample();
    }
    
    #[@test]
    public function can_construct() {
      new Sample();
      $this->assertTrue(true);
    }
  }