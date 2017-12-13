
function modbus_read(register, timeout) {
    var result = 2; //error
    var value = 0

		$.ajax({
			url: "http://192.168.4.1/control/modbus.ajax?read=" + register + "&timeout="+timeout,
			dataType: 'json',
			async: false,
			cache: false,
			timeout: timeout,
			tryCount : 0,
			retryLimit : 0,
			success: function (data) {
				if (data.length !== 0)
				{
					result = data.answer;
					value = data.value;
				}
			},
		error : function(xhr, textStatus, errorThrown ) {}
		});

    return {
    		result: result,
    		value: value
			};
}

function modbus_write(register, write_value, timeout) {
    var result = 2; //error
    var ret_value = 0

		$.ajax({
			url: "http://192.168.4.1/control/modbus.ajax?read=" + register + "&value="+ write_value + "&timeout="+timeout,
			dataType: 'json',
			async: false,
			cache: false,
			timeout: timeout,
			tryCount : 0,
			retryLimit : 0,
			success: function (data) {
				if (data.length !== 0)
				{
					result = data.answer;
					ret_value = data.value;
				}
			},
		error : function(xhr, textStatus, errorThrown ) {}
		});

    return {
    		result: result,
    		value: ret_value
			};
}
