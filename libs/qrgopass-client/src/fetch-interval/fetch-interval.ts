export const TOO_MANY_LOOPS = "TOO_MANY_LOOPS";

export const fetchInterval = (
    callback: () => Promise<boolean | undefined>,
    maxIterations: number,
    delay: number) => {
    let loopCount = 0;

    return new Promise<void>((resolve, reject) => {
        const fetchLoop = async () => {
            loopCount++;

            const taskComplete = await callback();
            console.log(`Loop count: ${loopCount}, Task complete: ${taskComplete}, Max iterations: ${maxIterations}`);
            if (taskComplete === false) {
                if (loopCount < maxIterations) {
                    setTimeout(fetchLoop, delay);
                } else {
                    reject(TOO_MANY_LOOPS);
                }
            } else {
                resolve();
            }
        }
        setTimeout(fetchLoop, delay);
    });
}