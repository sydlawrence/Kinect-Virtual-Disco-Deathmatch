  
import muthesius.net.*;
import org.webbitserver.*;
import SimpleOpenNI.*;

SimpleOpenNI kinect;
WebSocketP5 socket;

void setup() {
  socket = new WebSocketP5(this,8080);

  PVector p = new PVector(1,2,3);
  String json_output = "";

  kinect = new SimpleOpenNI(this);
  kinect.enableDepth();

  kinect.enableUser(SimpleOpenNI.SKEL_PROFILE_ALL);

  background(200, 0, 0);
  size(kinect.depthWidth(), kinect.depthHeight());
}

void draw() {
  kinect.update();

  PImage depth = kinect.depthImage();
  image(depth, 0, 0);

  IntVector userList = new IntVector();
  kinect.getUsers(userList);

  for( int i = 0 ; i < userList.size() ; i++ ) {
    int userId = userList.get(i);

    if( kinect.isTrackingSkeleton(userId) ) {
      stroke(255, 0, 255);
      strokeWeight(5);

      kinect.drawLimb(userId, SimpleOpenNI.SKEL_HEAD, SimpleOpenNI.SKEL_NECK);

      kinect.drawLimb(userId, SimpleOpenNI.SKEL_NECK, SimpleOpenNI.SKEL_LEFT_SHOULDER);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_SHOULDER, SimpleOpenNI.SKEL_LEFT_ELBOW);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_ELBOW, SimpleOpenNI.SKEL_LEFT_HAND);

      kinect.drawLimb(userId, SimpleOpenNI.SKEL_NECK, SimpleOpenNI.SKEL_RIGHT_SHOULDER);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER, SimpleOpenNI.SKEL_RIGHT_ELBOW);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_ELBOW, SimpleOpenNI.SKEL_RIGHT_HAND);

      kinect.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_SHOULDER, SimpleOpenNI.SKEL_TORSO);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_TORSO, SimpleOpenNI.SKEL_LEFT_HIP);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_HIP, SimpleOpenNI.SKEL_LEFT_KNEE);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_KNEE, SimpleOpenNI.SKEL_LEFT_FOOT);

      kinect.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER, SimpleOpenNI.SKEL_TORSO);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_TORSO, SimpleOpenNI.SKEL_RIGHT_HIP);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_HIP, SimpleOpenNI.SKEL_RIGHT_KNEE);
      kinect.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_KNEE, SimpleOpenNI.SKEL_RIGHT_FOOT);

      noStroke();
      fill(255, 255, 255);

      PVector head = getJoint(userId, SimpleOpenNI.SKEL_HEAD);
      PVector neck = getJoint(userId, SimpleOpenNI.SKEL_NECK);
      PVector torso = getJoint(userId, SimpleOpenNI.SKEL_TORSO);

      // intentinally backward
      PVector right_shoulder = getJoint(userId, SimpleOpenNI.SKEL_LEFT_SHOULDER);
      PVector right_elbow = getJoint(userId, SimpleOpenNI.SKEL_LEFT_ELBOW);
      PVector right_hand = getJoint(userId, SimpleOpenNI.SKEL_LEFT_HAND);
      PVector right_hip = getJoint(userId, SimpleOpenNI.SKEL_LEFT_HIP);
      PVector right_knee = getJoint(userId, SimpleOpenNI.SKEL_LEFT_KNEE);
      PVector right_foot = getJoint(userId, SimpleOpenNI.SKEL_LEFT_FOOT);

      // intentinally backward
      PVector left_shoulder = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER);
      PVector left_elbow = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_ELBOW);
      PVector left_hand = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_HAND);
      PVector left_hip = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_HIP);
      PVector left_knee = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_KNEE);
      PVector left_foot = getJoint(userId, SimpleOpenNI.SKEL_RIGHT_FOOT);

      String json = "{";
        json += "\"player\": " + userId + ",";
        json += jsonJoint(head, "head") + ",";
        json += jsonJoint(neck, "neck") + ",";
        json += jsonJoint(torso, "torso") + ",";
        json += jsonJoint(left_shoulder, "left_shoulder") + ",";
        json += jsonJoint(left_elbow, "left_elbow") + ",";
        json += jsonJoint(left_hand, "left_hand") + ",";
        json += jsonJoint(left_hip, "left_hip") + ",";
        json += jsonJoint(left_knee, "left_knee") + ",";
        json += jsonJoint(left_foot, "left_foot") + ",";
        json += jsonJoint(right_shoulder, "right_shoulder") + ",";
        json += jsonJoint(right_elbow, "right_elbow") + ",";
        json += jsonJoint(right_hand, "right_hand") + ",";
        json += jsonJoint(right_hip, "right_hip") + ",";
        json += jsonJoint(right_knee, "right_knee") + ",";
        json += jsonJoint(right_foot, "right_foot");
      json += "}";

      socket.broadcast(json);
    }
  }
}


PVector getJoint(int userId, int jointId) {
  PVector joint = new PVector();
  float confidence = kinect.getJointPositionSkeleton(userId, jointId, joint);
  if( confidence < 0.5 ) {
    return null;
  }

  PVector convertedJoint = new PVector();
  kinect.convertRealWorldToProjective(joint, convertedJoint);

  return convertedJoint;
}

String jsonJoint(PVector joint, String name) {
  String json = "\"" + name + "\":" + "{";

  if( joint != null )
    json += "\"x\":" + joint.x + ",\"y\":" + joint.y + ",\"z\":" + joint.z;

  json += "}";
  return json;
}

void drawJoint(PVector joint, int size) {
  if( joint == null ) {
    return;
  }

  ellipse(joint.x, joint.y, size, size);
}

void onNewUser(int userId) {
  println("start post detection");
  kinect.startPoseDetection("Psi", userId);
}

void onEndCalibration(int userId, boolean successful) {
  if( successful ) {
    println("  user calibrated!");
    socket.broadcast("{\"status\": \"calibrated\"}");
    kinect.startTrackingSkeleton(userId);
  } else {
    println( " failed to calibrate");
    kinect.startPoseDetection("Psi", userId);
  }
}

void onStartPose(String pose, int userId) {
  println("started post for user");
  kinect.stopPoseDetection(userId);
  kinect.requestCalibrationSkeleton(userId, true);
}

void stop(){
	socket.stop();
}

void mousePressed(){
  socket.broadcast("hello from processing!");
}

void websocketOnMessage(WebSocketConnection con, String msg){
	println(msg);
}

void websocketOnOpen(WebSocketConnection con){
  println("A client joined");
}

void websocketOnClosed(WebSocketConnection con){
  println("A client left");
}
