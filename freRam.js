// free memory V2.3
function lfrem() {
	Shelly.call("Sys.GetStatus", {}, function (response) {
		if (response) {
			let ramFree = response.ram_free || 0;
			print("Free ram: " + ramFree + " bites");
		} else {
			print("err: " + JSON.stringify(response));
		}
	});
}
/*
Shelly.call("Sys.GetStatus", {}, function (response) {
    print(JSON.stringify(response));
});
*/
lfrem();