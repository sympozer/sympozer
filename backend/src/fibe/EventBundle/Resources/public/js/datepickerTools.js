  $(document).ready(function() {
//Hidden input StartAt of Event Form replace by datetimepicker
$('#fibe_eventbundle_confeventtype_startAt').hide();
$(".alert ").hide();

//initialise le datepicker
$(".form_datetime")
			.wrap('<div class="input-group">')
            .after('<span class="input-group-addon"><span class="icon-calendar"></span></span>')
            .datetimepicker({format: 'yyyy-mm-dd hh:ii'});

 //Traitement des infos du datetimepicker 
 $(".form_datetime")
        .datetimepicker()
		.on('changeDate',function(ev){
	
			var val = $(this).data().date;
			
			if(val != null){
				val = val.split(" ");
				var date = val[0].split("-");
				var time = val[1].split(":");
				
				var year = date[0];
				var month = date[1];
				var day = date[2];
				
				var hour = time[0];
				var minute = time[1];
				
				console.log(year + month +day +hour+minute);
				//Fill startAt fields
				$('#fibe_eventbundle_confeventtype_startAt_date_month').val(month);
				$('#fibe_eventbundle_confeventtype_startAt_date_day').val(day);
				$('#fibe_eventbundle_confeventtype_startAt_date_year').val(year); 
				$('#fibe_eventbundle_confeventtype_startAt_time_hour').val(hour);
				$('#fibe_eventbundle_confeventtype_startAt_time_minute').val(minute); 
			} 
		}); 
});

