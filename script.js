document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(MotionPathPlugin);

    // repeat: -1 infinite
    let pitStops = [0.185, 0.385, 0.58, 0.66, 0.738, 0.78, 0.91, 1, 1.183];

    const resetStats = () => {

        for (let i = 0; i < pitStops.length - 1; i++) {
            const markerElement = document.querySelector(`.marker${i+1}`);
            const checkpointElement = document.querySelector(`.checkpoint${i+1}`);

            markerElement.classList.remove('active');
            markerElement.classList.remove('visited');
    
            checkpointElement.classList.remove('active');
            checkpointElement.classList.remove('visited');
        }
    }

    const timeline = gsap.timeline({ onRepeat: resetStats, repeat: -1 });

    // Checkpoint Animation
    // var duration = 1;
    // timeline.to(".checkpoint1", { 
    //     y:-15, scale: 0.7, ease:Power2.out, duration: duration / 4}).to(".checkpoint1", {
    //     y:0, scale: 1, ease:Bounce.in, delay: duration / 4, duration: duration / 2
    // });

    // Marker Animation
    // timeline.to(".marker2", {
    //     scale: 0.5, ease: "power2.in", duration: duration / 4
    // }).to(".marker2", {
    //     scale: 1, ease:"bounce.in", delay: duration / 4, duration: duration / 2
    // });

    // USA: 0.185, europe: 0.38, china: 0.58, singa: 0.66 scaleY(-1), india: 0.735, 
    // dubai: 0.78, ghana: 0.9 brazil: 1 // 1.185

    const onComplete = (index) => {
        const markerElement = document.querySelector(`.marker${index + 1}`);
        const checkpointElement = document.querySelector(`.checkpoint${index + 1}`);
        var duration = 1;

        markerElement.classList.add('active');
        markerElement.classList.remove('visited');

        checkpointElement.classList.add('active');
        checkpointElement.classList.remove('visited');
    }

    const onStart = (index) => {
        const markerElement = document.querySelector(`.marker${index}`);
        const checkpointElement = document.querySelector(`.checkpoint${index}`);

        markerElement.classList.remove('active');
        markerElement.classList.add('visited');

        checkpointElement.classList.remove('active');
        checkpointElement.classList.add('visited');
    }

    for (let i = 0; i < pitStops.length - 1; i++) {

        if (i === 2) {
            timeline.set("#airplane", { scaleY: -1 })
        } else if (i === pitStops.length - 2) {
            timeline.set("#airplane", { scaleY: 1 })
        }
        timeline
            .to("#airplane", {
                motionPath: {
                    path: "#planePath",
                    align: "#planePath",
                    alignOrigin: [0.5, 0.5],
                    start: pitStops[i],
                    end: pitStops[i + 1],
                    autoRotate: true,
                },
                transformOrigin: "50% 50%",
                duration: 4,
                onStart: (index) => {
                    onStart(i + 1);
                    console.log(`Segment start ${i + 1}`);
                },
                onComplete: () => {
                    onComplete(i + 1);
                    console.log(`Segment completed ${i + 1}`);
                }
            })
            .to("#airplane", { duration: 0.5 });
    }
});