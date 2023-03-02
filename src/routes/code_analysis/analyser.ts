export {}

async function processResults(fName:string){
    let errorCount: number = 0
    let linterCount: number = 0;

    const response = await fetch(fName);
    const results = await response.json();

    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += linter.total_number_errors;
    }

    console.log(errorCount);
    let score: number = errorCount / linterCount;
    return score;
}

let fName: string = "./megalinter-reports/mega-linter-report.json’ ";