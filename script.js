const visualizerContainer = document.getElementById('visualizer-container');
const startSortButton = document.getElementById('start-sort');
const reset = document.getElementById('reset');
const option = document.getElementById('option')

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

// Generate an array of random numbers
function generateArray(length = 50) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

// Visualize the array as bars
function displayArray(arr) {
    visualizerContainer.innerHTML = '';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.classList.add('bar');
        bar.textContent = value;
        visualizerContainer.appendChild(bar);
    });
}
let array = generateArray();



// BUBBLE SORT
async function Bubble_Sort(arr) {
    let len = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
                await delay(20);
                displayArray([...arr]); 
            }
        }
    } while (swapped);
}
// BUBBLE SORT



//INSERTION SORT
async function Insertion_Sort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            await delay(20);
            displayArray([...arr]); 
        }
        arr[j + 1] = key;
        displayArray([...arr]); 
    }
}
//INSERTION SORT



//MERGE SORT
async function Merge_Sort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        await Merge_Sort(arr, start, middle);
        await Merge_Sort(arr, middle + 1, end);
        await merge(arr, start, middle, end);
    }
}

async function merge(arr, start, middle, end) {
    let left = arr.slice(start, middle + 1);
    let right = arr.slice(middle + 1, end + 1);

    let k = start;
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
        await delay(20); 
        displayArray([...arr]);
    }

    while (i < left.length) {
        arr[k] = left[i];
        i++;
        k++;
        await delay(20); 
        displayArray([...arr]); 
    }

    while (j < right.length) {
        arr[k] = right[j];
        j++;
        k++;
        await delay(20); 
        displayArray([...arr]); 
    }
}
//MERGE SORT



//SELECTION SORT
async function Selection_Sort(arr) {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;

        displayArray([...arr]);
        await delay(20); 
    }
}
//SELECTION SORT


//QUICK SORT
async function Quick_Sort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        let index = await partition(arr, start, end);
        await Quick_Sort(arr, start, index - 1);
        await Quick_Sort(arr, index + 1, end);
    }
}


async function partition(arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start; 

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            displayArray([...arr]);
            await delay(20);
        }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    displayArray([...arr]);
    await delay(20);

    return pivotIndex;
}
//QUICK SORT



// Function to apply the glow effect to all bars
async function Apply_glow_effect() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.add('glow');
    });
}

// Function to clear the glow effect from all bars
function Clear_glow_effect() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.remove('glow');
    });
}

// Event listener for the sort button
startSortButton.addEventListener('click', () => {
    const selected_algorithm = option.value;
    if (selected_algorithm == "bubble"){
        Bubble_Sort(array).then(() => {
            Apply_glow_effect().then(() => {
                setTimeout(Clear_glow_effect, 5000)
            });
        });
    }
    if (selected_algorithm == "insertion"){
        Insertion_Sort(array).then(() => {
            Apply_glow_effect().then(() => {
                setTimeout(Clear_glow_effect, 5000)
            });
        });
    }
    if (selected_algorithm == "selection"){
        Selection_Sort(array).then(() => {
            Apply_glow_effect().then(() => {
                setTimeout(Clear_glow_effect, 5000)
            });
        });
    }
    if (selected_algorithm == "quick"){
        Quick_Sort(array).then(() => {
            Apply_glow_effect().then(() => {
                setTimeout(Clear_glow_effect, 5000)
            });
        });
    }
    if (selected_algorithm == "merge"){
        Merge_Sort(array).then(() => {
            Apply_glow_effect().then(() => {
                setTimeout(Clear_glow_effect, 5000)
            });
        });
    }
});

// Initial display
displayArray(array);

// Reset the page
reset.addEventListener('click', () => {
    location.reload(true)
});
