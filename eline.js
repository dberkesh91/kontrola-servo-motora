
var power_toggle = true;

function eline_init()
{
		// init
		$("#console").append("Mapping application control...");
		result = modbus_write(0x100A, 0x20020001, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping application password...");
		result = modbus_write(0x100B, 0x20020002, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Set password...");
		result = modbus_write(0x000A, 0x6E657277, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Activating DS402...");
		result = modbus_write(0x000B, 0x1, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping operation register...");
		result = modbus_write(0x1000, 0x60600000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping control register...");
		result = modbus_write(0x1001, 0x60400000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping target velocity...");
		result = modbus_write(0x1002, 0x60420000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping actual velocity...");
		result = modbus_write(0x1003, 0x3A040001, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping temperature...");
		result = modbus_write(0x1004, 0x31140000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping power voltage...");
		result = modbus_write(0x1005, 0x31110000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Mapping firmware version...");
		result = modbus_write(0x1006, 0x30230000, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Set velocity mode...");
		result = modbus_write(0x0000, 2, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Shut down...");
		result = modbus_write(0x0001, 6, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Reset...");
		result = modbus_write(0x0001, 0, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");


		$("#console").append("Fault reset...");
		result = modbus_write(0x0001, 0x80, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Reset...");
		result = modbus_write(0x0001, 0, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Shut down...");
		result = modbus_write(0x0001, 6, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Switch on...");
		result = modbus_write(0x0001, 7, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Operation enable...");
		result = modbus_write(0x0001, 0x0f, 200);
		if (result.result == 1) $("#console").append("<span class=\"OK\">OK</span></br>");
		else $("#console").append("<span class=\"ERROR\">ERROR</span></br>");

		$("#console").append("Done...</br>");
}


function eline_polling()
{
	if(power_toggle)
	{
		result = modbus_read(0x0005, 200); // voltage
		$("#actual_voltage").html( (result.value/1000) + " V");

		result = modbus_read(0x0004, 200); // temp
		$("#actual_temp").html( (result.value/10) + " C");

		result = modbus_read(0x0003, 200); // velocity
		$("#actual_velocity").html( (result.value) + " rpm");

	}
	else
	{
		$("#actual_voltage").html("- V");
		$("#actual_temp").html( "- C");
		$("#actual_velocity").html( "- rpm");
	}
}

function eline_start_gui()
{
	setInterval(function () {eline_polling()}, 1000);
}

function eline_power_toggle()
{
	if(power_toggle)
	{
		power_toggle = false;
		$("#toggle").html("SWITCH ON");
		$("#current-state").html("The motor is currently off")
		$("#toggle").css("background-color", "#555");
		result = modbus_write(0x0001, 7, 200); // Switch on
	}
	else
	{
		power_toggle = true;
		$("#toggle").html("SWITCH OFF");
		$("#current-state").html("The motor is currently on")
		$("#toggle").css("background-color", "#ff9600");
		result = modbus_write(0x0001, 0x0f, 200);
	}
}
