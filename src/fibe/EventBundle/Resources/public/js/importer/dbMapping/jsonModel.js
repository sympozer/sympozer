Model = {


	initialize : function(mapper){
		Model.mapper = mapper;
	},

	"entities" : {
		"Conference" : {
			attributes : {
				required : {
					"summary" : {
						setter : "setLabel"
          }
				},
				optionnal : {
					"homepage" : {
						setter : "setUrl"
          },
					"description" : {
						setter : "setDescription"
          },
					"comment" : {
						setter : "setComment"
          },
					"organizer" : {
						setter : "setOrganizer"
          },
					// "contacts" : {
					// 	setter : "setContacts",
					// },
					"acronym" : {
						setter : "setAcronym"
          },
					"logo" : {
						setter : "setLogo"
          },
					// "location" : {
					// 	setter : "setLocation"
     //      }
				}
			}
		},
		"Event" : {
            array   :"events",
			attributes : {
				required : {
					"summary" : {
    						setter : "setLabel"
              }},
    				optionnal : {
    					"description" : {
    						setter : "setStartAt"
              },
    					"description" : {
    						setter : "setEndAt"
              },
    					"description" : {
    						setter : "setDescription"
              },
    					"comment" : {
    						setter : "setComment"
              },
                        "acronym" : {
                            setter : "setAcronym"
              },
                        "logo" : {
                            setter : "setLogo"
              },
    					// "organizer" : {
    					// 	setter : "setOrganizer"
         //      },
    					// "location" : {
    					// 	setter : "setLocation"
         //      }
				}
			}
		},
		"Person" : {
            array   :"persons",
			attributes : {
				required : {
					"familyName" : {
						setter : "setFamilyName"
          },
					"firstName" : {
						setter : "setFirstName"
          }},
				optionnal : {
					"email" : {
						setter : "setEmail"
          },
					"age" : {
						setter : "setAge"
          },
					"img" : {
						setter : "setImg"
          },
					"page" : {
						setter : "setPage"
          }
          // "organizations" : {
					// 	setter : "setOrganizations",
					// },
					// "accounts" : {
					// 	setter : "setAccounts",
					// },
					// "papers" : {
					// 	setter : "setPapers",
					// }
				}
			}
		},


		"Publication" : {
            array   :"proceedings",
			attributes : {
				required : {
					"title" : {
						setter : "setTitle"
          },
					"abstract" : {
						setter : "setAbstract"
          }},
				optionnal : {
					"publishdate" : {
						setter : "setPublishdate"
          },
					"publisher" : {
						setter : "setPublisher"
          },
					"url" : {
						setter : "setUrl"
          }
          // "authors" : {
					// 	setter : "setAuthors",
					// },
					// "subjects" : {
					// 	setter : "setSubjects",
					// },
					// "topics" : {
					// 	setter : "setTopics",
					// },
					// "events" : {
					// 	setter : "setEvents",
					// }
				}
			}
		},

		"Organization" : {
            array   : "organizations",
			attributes : {
				required : {
					"name" : {
						setter : "setName"
          }},
				optionnal : {
					"page" : {
						setter : "setPage"
          },
					"country" : {
						setter : "setCountry"
          }
          // "members" : {
					// 	setter : "setMembers",
					// },
				}
			}
	  	},

		// "Social Account" : {
		// 	attributes : {
		// 		required : {
		// 			"accountName" : {
		// 				setter : "setAccountName",
		// 		}},
		// 		optionnal : {
		// 			"owner" : {
		// 				setter : "setOwner",
		// 			},
		// 			"socialService" : {
		// 				setter : "setSocialService",
		// 		}}
		// 	}

		// },


		"Location" : {
            array   : "locations",
			attributes : {
				required : {
					"name" : {
						setter : "setName"
          }},
				optionnal : {
					"capacity" : {
						setter : "setCapacity"
          },
					"description" : {
						setter : "setDescription"
          },
					"longitude" : {
						setter : "setLongitude"
          },
					"latitude" : {
						setter : "setLatitude"
          }}
			}

		},
		"Topic" : {
            array : "topics",
			attributes : {
				required : {
					"name" : {
						setter : "setName"
          }},
				optionnal : {}

			}
		}
	},

	modelToTab : function($el){
        var mainPanel = Pager.getPanelHtml("Base model",{panelClass:"panel-primary"});
		$el.append(mainPanel);
		for(var i in Model.entities){
  			var entity = Model.entities[i];
        	modelPanel = Pager.getPanelHtml(i,{panelClass:"panel-danger",margin:true,"model-path":entity.array || i, collapsible:true,collapsed:true});

       		$.each(entity.attributes.required, function(aIndex, attribute){
	       		var newAttr = $(Model.generateAttributeNode(aIndex, {required:true,"model-path":entity.array+"/"+aIndex, "model-setter":attribute.setter}));
	       		// newEntity.append(newAttr);
       			modelPanel.children("ul").append(newAttr);
	       	})

       		$.each(entity.attributes.optionnal, function(aIndex, attribute){
       			var newAttr = $(Model.generateAttributeNode(aIndex, {required:false,"model-path":entity.array+"/"+aIndex, "model-setter":attribute.setter}));
       			modelPanel.children("ul").append(newAttr);
       			// newEntity.append(newAttr);
	       	})
	        mainPanel.append(modelPanel);
        };


		$(".model-node").droppable({
			accept: ".map-node" ,
            tolerance: "pointer" ,
			over: function( event, ui ) {
		        	if($(this).hasClass("list-group-item-danger")){
			        	$(this).data("oldStyle","danger")
			        	$(this).removeClass("list-group-item-danger");
			        }else if($(this).hasClass("list-group-item-success")){
			        	$(this).data("oldStyle","success")
			        }else{
			        	$(this).data("oldStyle",false)
			        }
			        $(this).addClass("list-group-item-success")
			        var $this =$(this);
		        	validateParentPanel($this);
			},
			out: function( event, ui ) {
	        	$(this).removeClass("list-group-item-success")
		        if($(this).data("oldStyle")) {
		        	$(this).addClass("list-group-item-"+$(this).data("oldStyle")) ;
		        }
		        var $this =$(this);
	        	setTimeout(function() {
	        		validateParentPanel($this);
	        	},1);
			},
			drop: function( event, ui ) {
        		mapper.addDataLink($(this).data("model-path"),ui.draggable.data("node-path"));

		        var indicator = $("<a href='#' style='float:right' class='btn-danger btn btn-xs'><i class='fa fa-trash-o'></i> "+ui.draggable.data("node-path")+"</a>");
		        indicator.click({target : $(this)}, function(ev){
		        	mapper.removeDataLink[$(this).data("model-path")];
		        	var parent = $(this).parent().removeClass("list-group-item-success");
		        	if(parent.data("required"))parent.addClass("list-group-item-danger")
	        		validateParentPanel(parent);
		        	$(this).remove();
		        	return false;
		        })
		        $(this).find("> .btn").remove();
		        $(this).append(indicator);
			}
		});

		function validateParentPanel($div){

		        var panelDiv = $div.parent().parent();
		        if($div.siblings(".list-group-item-danger").length==0 && !$div.hasClass("list-group-item-danger")){
		        	panelDiv.addClass("panel-success")
		        	panelDiv.removeClass("panel-danger")
		        }else{
		        	panelDiv.removeClass("panel-success")
		        	panelDiv.addClass("panel-danger")
		        }
		}
	},

	generateAttributeNode : function(attribute, options){
        return '<li class="model-node list-group-item'+(options.required===true?" list-group-item-danger":"")+'" data-required="'+(options.required===true)+'" data-model-path="'+options["model-path"]+'" data-model-setter="'+options["model-setter"]+'" style="'+options.style+'">'+attribute+'</li>';

	},

	getSetter : function(entityName,attribute){
        var modelMapping = Model.getModelMappingByArrayName(entityName.toLowerCase());
        if(modelMapping.attributes.required[attribute]){
            return modelMapping.attributes.required[attribute].setter;
        }else{
            return modelMapping.attributes.optionnal[attribute].setter;
        }
    },

    getArrayName : function(entityName){
        for(var i in Model.entities){
            if( i.toLowerCase() == entityName.toLowerCase()){
                return entityName;
            }
        }
    },
	getModelMappingByArrayName : function(arrayName){
		if(arrayName=="Conference".toLowerCase())return Model.entities["Conference"];
	    for(var i in Model.entities){
	    	if(i == "Conference")continue;
	        if(Model.entities[i].array.toLowerCase() == arrayName){
	            return Model.entities[i];
	        }
	    }
    }


}



