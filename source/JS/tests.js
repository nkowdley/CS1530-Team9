//Add jquery
var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


//Hello World test
QUnit.test("hello test", function(assert) 
{
    assert.ok(1 == "1", "One does in fact equal 1");
});

QUnit.test("maps test", function(assert) 
{
    //Gets script to be tested
    $.getScript("JS/maps.js", function(){
        var result = gotoMap();
        assert.ok(result, "gotoMap() returned a map obj that evalutes to true");
    });
});
