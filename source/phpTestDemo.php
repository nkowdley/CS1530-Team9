<?php
//Only meant to run on the server itself, local host configuration would likely need to be identical
class StackTest extends PHPUnit_Framework_TestCase
{
    //Simple Hello World test for the framework
    public function testPHPUnit()
    {
        $this->assertEquals(0, 0);
    }
}
?>