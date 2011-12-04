
var
  left_arm_up = {"player":0,"head":{},"neck":{"x":335.9894,"y":77.436584,"z":1910.7858},"torso":{"x":343.80112,"y":145.10196,"z":1904.1545},"left_shoulder":{"x":383.72018,"y":72.671234,"z":1917.9144},"left_elbow":{"x":458.89987,"y":30.831863,"z":1900.9401},"left_hand":{"x":544.34973,"y":-28.948486,"z":1753.5392},"left_hip":{"x":383.10065,"y":209.76541,"z":1902.185},"left_knee":{"x":385.79477,"y":347.04288,"z":1906.2435},"left_foot":{"x":388.12442,"y":473.31467,"z":1947.4502},"right_shoulder":{"x":287.90115,"y":82.23761,"z":1903.6571},"right_elbow":{"x":278.75232,"y":177.23451,"z":1889.2218},"right_hand":{"x":295.37228,"y":273.2445,"z":1804.0836},"right_hip":{"x":320.07935,"y":216.73227,"z":1892.8616},"right_knee":{"x":316.07285,"y":355.71286,"z":1878.2675},"right_foot":{"x":313.62393,"y":482.4981,"z":1926.8319}},
  right_arm_up = {"player":0,"head":{},"neck":{"x":372.26773,"y":82.505615,"z":1918.6808},"torso":{"x":364.27405,"y":149.611,"z":1908.0667},"left_shoulder":{"x":417.59058,"y":90.987305,"z":1948.8685},"left_elbow":{"x":431.95746,"y":181.53423,"z":1952.0476},"left_hand":{"x":424.04572,"y":266.86115,"z":1857.0197},"left_hip":{"x":386.4851,"y":221.71567,"z":1917.1938},"left_knee":{"x":389.3196,"y":358.41302,"z":1912.8872},"left_foot":{"x":387.51807,"y":484.7255,"z":1949.7855},"right_shoulder":{"x":325.49588,"y":73.75278,"z":1888.493},"right_elbow":{"x":238.65973,"y":49.72444,"z":1804.172},"right_hand":{"x":156.81691,"y":-31.934753,"z":1617.1787},"right_hip":{"x":325.25983,"y":213.12926,"z":1877.7112},"right_knee":{"x":317.3579,"y":351.73148,"z":1885.8094},"right_foot":{"x":314.5585,"y":479.4693,"z":1925.504}},
  left_foot_up = {"player":0,"head":{},"neck":{"x":298.40857,"y":79.346466,"z":1881.5144},"torso":{"x":316.4026,"y":146.10925,"z":1874.3804},"left_shoulder":{"x":345.1401,"y":68.89984,"z":1903.0059},"left_elbow":{"x":380.28827,"y":147.6288,"z":1986.3138},"left_hand":{"x":413.98578,"y":225.31873,"z":1892.8258},"left_hip":{"x":365.1766,"y":205.4706,"z":1881.3005},"left_knee":{"x":412.11777,"y":215.50722,"z":1496.5325},"left_foot":{"x":383.13406,"y":380.6726,"z":1579.6365},"right_shoulder":{"x":250.59714,"y":90.034485,"z":1860.023},"right_elbow":{"x":221.69647,"y":187.202,"z":1876.0393},"right_hand":{"x":219.7122,"y":277.3263,"z":1791.3414},"right_hip":{"x":303.4268,"y":221.41385,"z":1853.1921},"right_knee":{"x":302.14276,"y":364.10437,"z":1827.0256},"right_foot":{"x":324.6149,"y":493.3857,"z":1869.3679}},
  right_foot_up = {"player":0,"head":{},"neck":{"x":423.59045,"y":81.08249,"z":1916.1633},"torso":{"x":420.39972,"y":148.30455,"z":1900.2751},"left_shoulder":{"x":471.2652,"y":84.43497,"z":1921.1284},"left_elbow":{"x":493.9349,"y":178.3573,"z":1967.377},"left_hand":{"x":506.15546,"y":271.2973,"z":1864.585},"left_hip":{"x":448.89532,"y":218.65819,"z":1887.6338},"left_knee":{"x":418.6203,"y":355.05872,"z":1857.9604},"left_foot":{"x":392.60535,"y":479.75403,"z":1915.3091},"right_shoulder":{"x":375.66797,"y":77.71257,"z":1911.1982},"right_elbow":{"x":336.8103,"y":158.8576,"z":1969.1179},"right_hand":{"x":317.54572,"y":242.27007,"z":1911.5511},"right_hip":{"x":385.30554,"y":214.6553,"z":1881.1401},"right_knee":{"x":350.5124,"y":205.31949,"z":1478.8683},"right_foot":{"x":354.51242,"y":356.25122,"z":1597.6003}};

// REMEMBER: Screen coords, Y grows downwards, so arms about shoulders means arms have a SMALLER y-coord than shoulders

Skeleton = function(data) {

  this.joints = data;

  this.valid = function() {
    return this.joints.head && this.joints.neck && this.joints.left_foot && this.joints.right_foot && this.joints.left_hand && this.joints.right_hand;
  }

  this.handAboveElbow = function(side) {
    return this.joints[side + "_hand"].y < this.joints[side + "_elbow"].y;
  }
  
  this.handsOnHead = function() {
    var distance = Vector.distance(this.joints.head,this.joints.neck);
    if (!distance) {
      return false;
    }
       
    return Vector.distance(this.joints.head, this.joints.left_hand) < distance && Vector.distance(this.joints.head, this.joints.right_hand) < distance;
  }

  this.elbowAboveShoulder = function(side) {
    return this.joints[side + "_elbow"].y < this.joints[side + "_shoulder"].y;
  }

  this.kneeAboveOtherKnee = function(knee, other) {
    return this.joints[knee + "_knee"].y < this.joints[other + "_knee"];
  }

  this.footAboveOtherFoot = function(foot, other) {
    var neckToFoot = Vector.distance(this.joints[foot + "_foot"],this.joints.neck);
    var neckToOther = Vector.distance(this.joints[other + "_foot"],this.joints.neck);
    var neckToHead = Vector.distance(this.joints.head,this.joints.neck);


    /*
    if( this.joints.neck.y && this.joints.left_foot.y ) {
      console.log(neckToFoot);
      console.log(neckToOther);
      console.log(neckToHead);
      console.log(this.joints.neck);
      console.log(this.joints.left_foot);
      console.log(this.joints.right_foot);
      console.log(this.joints.head);
    }
    */

    if( (neckToOther - neckToFoot) > neckToHead )
      return true;

    return false;
  }

  this.leftArmUp = function() {
    return this.elbowAboveShoulder("left") && this.handAboveElbow("left");
  }

  this.rightArmUp = function() {
    return this.elbowAboveShoulder("right") && this.handAboveElbow("right");
  }

  this.leftFootUp = function() {
    return this.footAboveOtherFoot("left", "right");
  }

  this.rightFootUp = function() {
    return this.footAboveOtherFoot("right", "left");
  }

  return this;
};

