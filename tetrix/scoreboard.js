function scoreboard() {
    this.show = function () {
        fill(255);
        strokeWeight(2);
        stroke(0);
        rect(300,0,5,height);
        textSize(24);
        text("No Of Lines",400,100);
        fill(255);
        text(lines,400,150);
        textAlign(CENTER);
        fill(255);
        text("Score",400,300);
        fill(255);
        text(score,400,350);
        //rect(350,100,10,10);
    }
}