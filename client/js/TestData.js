TestData = {
  data: [],
  
  push: function(str, value) {
    if (!TestData.data[str]) {
      TestData.data[str] = [];
    }
    
    TestData.data[str].push(value);
    
    TestData.log();
  },

  log: function() {
    console.log(Testdata.data);
  }

}