/*
	Simple WebSocketServer Example
	http://github.com/muthesius/WebSocketP5
 */

import muthesius.net.*;
import org.webbitserver.*;
import SimpleOpenNI.*;

SimpleOpenNI kinect;
WebSocketP5 socket;

void setup() {
  socket = new WebSocketP5(this,8080);

  kinect = new SimpleOpenNI(this);
  kinect.enableDepth();

  kinect.enableUser(SimpleOpenNI.SKEL_PROFILE_ALL);
  size(640,480);
  fill(255,0,0);
}

void draw() {
  kinect.update();
  PImage depth = kinect.depthImage();
  image(depth, 0, 0);

  IntVector userList = new IntVector();
  kinect.getUsers(userList);

  if( userList.size() > 0 ) {
    int userId = userList.get(0);

    if( kinect.isTrackingSkeleton(userId) ) {
      PVector rightHand = new PVector();
      PVector leftHand = new PVector();

      float confidence = kinect.getJointPositionSkeleton(userId, SimpleOpenNI.SKEL_LEFT_HAND, rightHand);

      PVector convertedRightHand = new PVector();
      kinect.convertRealWorldToProjective(rightHand, convertedRightHand);

      confidence = kinect.getJointPositionSkeleton(userId, SimpleOpenNI.SKEL_RIGHT_HAND, leftHand);

      PVector convertedLeftHand = new PVector();
      kinect.convertRealWorldToProjective(leftHand, convertedLeftHand);

      fill(255, 0, 0);
      ellipse(convertedRightHand.x, convertedRightHand.y, 10, 10);

      fill(0, 0, 255);
      ellipse(convertedLeftHand.x, convertedLeftHand.y, 10, 10);

      socket.broadcast("hello from processing!");
      socket.broadcast(convertedLeftHand.x + "," + convertedLeftHand.y + " " + convertedRightHand.x + "," + convertedRightHand.y);

      /*
      smooth();
      strokeWeight(10);
      stroke(0, 255, 0);
      line(convertedLeftHand.x, convertedLeftHand.y, convertedRightHand.x, convertedRightHand.y);
      */
    }
  }
}

void onNewUser(int userId) {
  println("start post detection");
  kinect.startPoseDetection("Psi", userId);
}

void onEndCalibration(int userId, boolean successful) {
  if( successful ) {
    println("  user calibrated!");
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
