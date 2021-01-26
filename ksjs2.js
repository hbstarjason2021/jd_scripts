const url = 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json';

const bodyFilter = 'var result = JSON.parse(body); return JSON.stringify(result[167]);';

const myRequest = {
    url: url,
    opts:{'filter': bodyFilter}
};

$task.fetch(myRequest).then(response => {
    console.log(response.body);
    $notify("T", "S", response.body);
    $done();
}, reason => {
    $done();
    // reason.error
});