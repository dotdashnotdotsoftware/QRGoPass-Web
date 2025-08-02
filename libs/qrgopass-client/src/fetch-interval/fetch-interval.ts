export const fetchInterval = (
    callback: () => Promise<boolean | undefined>,
    tooManyLoopsCallback: () => void,
    maxIterations: number,
    delay: number) => {
    let loopCount = 0;
    const fetchLoop = async () => {
        loopCount++;

        const taskComplete = await callback();
        if (taskComplete === false) {
            if (loopCount < maxIterations) {
                setTimeout(fetchLoop, delay);
            } else {
                tooManyLoopsCallback();
            }
        }
    }
    setTimeout(fetchLoop, delay);
}