function analyser(fName){
    let errorCount: number = 0
    let linterCount: number = 0;

    let results: {} = fetch(fName);

    for (const linter of results['linters']){   
        linterCount += 1;
        errorCount += linter['total_number_errors'];
    }

    console.log(errorCount);
    let score: number = errorCount / linterCount;
    return score;
}

let fName: string = "mega-linter-report.json";