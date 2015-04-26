describe("jasmine.any", function() {
  it("matches any value", function() {
    var calc = new Calculator();
    expect(calc).toEqual(jasmine.any(Calculator));
  });

  it("is useful for comparing arguments", function() {
      var calc = new Calculator();
      spyOn(calc, 'sum');
      calc.sum(1,2);
      expect(calc.sum).toHaveBeenCalledWith(
        jasmine.any(Number),
        jasmine.any(Number)
      );
  });
});

function Calculator () {
  this.sum = function (a, b){
    return a+b;
  };
}
