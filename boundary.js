function Boundary() {

}

Boundary.prototype.show = function() {
  stroke(255);
  strokeWeight(2);
  line(171,75,475,75) // AB
  line(475,75,629,425) // BC
  line(629,425,629,435) // CD
  line(629,435,689,460) // DE
  line(689,460,709,476) // EF
  line(709,476,660,601) // FG
  line(660,601,475,771) // GH
  line(475,771,179,771) // HI
  line(179,771,150,633) // IJ
  line(150,633,171,75) // JA
}
