QUnit.test("hello test", function(assert) 
{
    assert.ok(1 == "1", "One does in fact equal 1");
});

QUnit.test("maps test", function(assert) 
{
    //Gets script to be tested
    $.getScript("maps.js", function(){
        var result = gotoMap();
        assert.ok(result, "gotoMap() returned a map obj that evalutes to true");
    });
});
