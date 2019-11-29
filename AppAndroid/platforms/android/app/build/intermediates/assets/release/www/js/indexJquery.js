      var jQuery = $.noConflict();
			var banActivo = false;
			var slider1;
			var slider2;
			var slider3;
			var slider4;
			var slider5;
			var slider6;
			var slider7;
			var slider8;
			var tSlider = 0;


			var marcadores  = new Array();

			var punteroFavorito = 0;
			var listasPosicionesFavoritas = new Array();

			var listasPosicionesPropiedadesDest = new Array();

			var datosUsuario = new Array();
			var listCostosMembresias = new Array();
			var listAsociados = new Array();
			var listPropiedades = new Array();
			var listPropiedadesDescatacas = new Array();
			var listEntradas = new Array();
			var listContenidos = new Array();
			var listEventos = new Array();
			var listCapacitaciones = new Array();
			var listAgendaG = new Array();
			var listMensajeG = new Array();
			var urlBasePropiedad = "http://villahermosa.ampiserver.net/modulos/assets/fileClient/";
			var urlBaseAsociado = "http://villahermosa.ampiserver.net/images/fotos/";
			var urlBaseEntrada = "http://villahermosa.ampiserver.net/images/entradas/";
			var urlBaseSlider  = "http://villahermosa.ampiserver.net/images/sliders/";
			var urlBaseContenido  = "http://villahermosa.ampiserver.net/images/contenido/";
			var urlBaseContenidoDocumento  = "http://villahermosa.ampiserver.net/documentosContenido/";
			var urlBaseEvento  = "http://villahermosa.ampiserver.net/modulos/assets/fileClient/";
			var urlBaseCapacitacion  = "http://villahermosa.ampiserver.net/modulos/assets/fileClient/";


			var listCaracteristicasPropiedadesE = new Array();
			
			jQuery(window).load(function()
			{
				setTimeout(function()
				{
					//jQuery(".Cargando").animate({left: "-150%"},1000);
					//jQuery(".Login").animate({left: "0%"},700);				
										
					/*if(localStorage.getItem("tipo")!=''&&localStorage.getItem("tipo")!=null&&localStorage.getItem("tipo")!='null')
					{
						document.location.href = "#Home";
						//jQuery(".Home").css({"left":"0%"});
						//jQuery(".Home").animate({left: "0%"},700);
												
						jQuery(".MiRegistro-ImgRG img").attr("src",localStorage.getItem("imagen"));
						jQuery("#dtNombreRegistro").html(localStorage.getItem("nombre"));
						jQuery("#dtTipoRegistro").html(localStorage.getItem("tipo"));
						jQuery("#dtEmailRegistro").html(localStorage.getItem("email"));
						jQuery("#dtTelRegistro").html(localStorage.getItem("telefono"));
						
						
						if(localStorage.getItem("tipo")=="Acompañante")
						{
							jQuery(".Programa-T1").slideUp('slow');
							jQuery(".Programa-T2").slideDown('slow');
						}
						else
						{
							jQuery(".Programa-T2").slideUp('slow');
							jQuery(".Programa-T1").slideDown('slow');
						}
					}						
					else*/
						//jQuery(".Login").animate({left: "0%"},700);
				},2000);
				//activar_mapa();

				//PushNotification();

				if(localStorage.getItem("Usuario")!=''&&localStorage.getItem("Contrasenia")!=null){
					jQuery("#txtUsuario").val(localStorage.getItem("Usuario"));
					jQuery("#txtContrasenia").val(localStorage.getItem("Contrasenia"));

					jQuery("#btnIngresar").click();
				}


				document.addEventListener('deviceready', function () 
				{
				  // Enable to debug issues.
				  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

				  	var notificationOpenedCallback = function(jsonData) {
						console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
					};

					window.plugins.OneSignal
					.startInit("83ff48a9-1c3f-4cb5-800b-25893d2923a2")
					//.startInit("7bc19e16-0016-4a51-a3f5-0a8892e99806")//Acompañantes
					.handleNotificationOpened(notificationOpenedCallback)
					.endInit();

					// Call syncHashedEmail anywhere in your app if you have the user's email.
					// This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
					// window.plugins.OneSignal.syncHashedEmail(userEmail);
				}, false);

			});
			
		    jQuery(document).ready(function()
			{  
				//Nueva propiedad
				jQuery("#map_canvas").googleMap();
				jQuery("#map_canvas").addMarker({
						coords: [17.987230698010958, -92.94069548779294], // GPS coords
						draggable: true,
					success: function(e) {
						jQuery("#hdLatNP").val(e.lat);
						jQuery("#hdLongNP").val(e.lon);
					}
				});

				jQuery('.lista').fancySelect();
				
				//Activa el calendario
				jQuery(".datepicker").datepicker(
				{
					dateFormat: 'dd/mm/yy'
				});


				jQuery('#txtHoraCita').timepicker({
                    'timeFormat': 'h:i a',
                    'minTime': '8:00am',
                    'maxTime': '08:00pm',
                    'showDuration': true
				});
				

				//document.getElementById('flImgFoto').addEventListener('change', archivo, false);


				jQuery("#txtUsuario").change(function ()
				{
					if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) 
					{
						jQuery('input:-webkit-autofill').each(function()
						{
							var text = jQuery(this).val();
							var name = jQuery(this).attr('name');
							jQuery(this).after(this.outerHTML).remove();
							jQuery('input[name=' + name + ']').val(text);
						});
					}
				});	

				/*//Mostrar partes del mapa
				jQuery(".MapaDelEvento-Secc").each(function(w)
				{
					jQuery(this).click(function()
					{
						jQuery(".MapaDelEvento-ImgSeccion").eq(w).css({"z-index":"2"});
						jQuery('.MapaDelEvento-ImgSeccion').eq(w).fadeIn("slow");
					});
				});
				
				//Cerrar imagen de partes del mapa
				jQuery(".MapaDelEvento-BtnCerrar").click(function()
				{
					jQuery(".MapaDelEvento-ImgSeccion").css({"z-index":"0"});
					jQuery('.MapaDelEvento-ImgSeccion').fadeOut("slow");
				});*/

				//Obtener precio range
				jQuery('#rgRangoPrecio').change(function(){
					jQuery("#FiltrosPropiedades-Cantidad").html(number_format(jQuery(this).val(),2));
				});
				
				//Moviento de menu ampi (acerca de)
				jQuery('.Ampi-Menu').swipe(
				{ 
					swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) 
					{
						jQuery('.Ampi-SiguienteListMenu').eq(0).click();	
					},
					swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) 
				 	{
						jQuery('.Ampi-AnteriorListMenu').eq(0).click();
					}
				});

				//Cerrar mi perfil
				jQuery('.PerFil').swipe(
				{ 
					swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) 
					{
						jQuery(".PerFil-Blur").click();	
					}
				});

				//Abrir perfil
				jQuery(".Header-Avatar img").click(function()
				{					
					jQuery(".PerFil").animate({left:"0%"},400);

					setTimeout(function()
					{
						jQuery(".PerFil-Blur").animate({opacity:"1"},400);
					},300);

					setTimeout(function()
					{
						jQuery("section").addClass("u-blur");
					},600);
				});

				//Cerrar Perfil
				jQuery(".PerFil-Blur").click(function()
				{					
					jQuery(".PerFil-Blur").animate({opacity:"0"},400);
					jQuery("section").removeClass("u-blur");

					setTimeout(function()
					{
						jQuery(".PerFil").animate({left:"-100%"},400);						
					},300);
				});			

				//Abrir Ampi
				jQuery(".Header-Logo img").click(function()
				{						
					jQuery(".Ampi").fadeIn("slow");

					setTimeout(function()
					{
						jQuery("section").addClass("u-blur");
					},300);
				});

				//Cerrar Ampi
				jQuery(".Ampi .icon-icoCerrar").click(function()
				{
					jQuery(".Ampi").fadeOut("slow");
					jQuery("section").removeClass("u-blur");
				});

				//Cerrar menu modal
				jQuery(".Ampi-List li a").click(function()
				{
					//alert("Prueba");
					jQuery(".Ampi").fadeOut("slow");
					jQuery("section").removeClass("u-blur");
				});

				//Navegacion de acerca de ampi
				jQuery(".Ampi-SiguienteListMenu").click(function()
				{
					if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==1){
						jQuery(".Ampi-AnteriorListMenu").slideDown('slow');	
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-58px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",2);
					}
					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==2){					
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-149px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",3);
					}
					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==3){
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-236px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",4);
					}

					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==4){
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-305px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",5);
					}
				});

				//Navegacion de acerca de ampi
				jQuery(".Ampi-AnteriorListMenu").click(function()
				{
					if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==2){
						jQuery(".Ampi-AnteriorListMenu").slideUp('slow');
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"0px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",1);
					}
					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==3){
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-58px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",2);
					}

					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==4){
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-149px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",3);
					}

					else if(jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion")==5){
						jQuery(".Ampi-ItemListMenu--Historia").animate({"margin-left":"-236px"});
						jQuery(".Ampi-SiguienteListMenu--Principal").data("posicion",4);
					}
				});

				//Ver perfil
				jQuery(".Perfil-LinkPerfil").click(function()
				{					
					jQuery(".PerFil-Blur").animate({opacity:"0"},400);
					jQuery("section").removeClass("u-blur");

					setTimeout(function()
					{
						jQuery(".PerFil").animate({left:"-100%"},400);						
					},300);
				});

				//Cerrar sesión
				jQuery(".PerFil-CerrarSesion").click(function()
				{					
					jQuery(".PerFil-Blur").animate({opacity:"0"},400);
					jQuery("section").removeClass("u-blur");

					setTimeout(function()
					{
						jQuery(".PerFil").animate({left:"-100%"},400);						
					},300);					
				});

				//Boton perfil
				jQuery(".PerFil-Btn").click(function()
				{
					jQuery(".PerFil-Blur").animate({opacity:"0"},400);
					jQuery("section").removeClass("u-blur");

					setTimeout(function()
					{
						jQuery(".PerFil").animate({left:"-100%"},400);						
					},300);
				});

				//Crear cuenta
				jQuery("#btnRegistrate").click(function()
				{					
					if(validar_campo("#txtNombres",4,"Nombre (s)"))
						if(validar_campo("#txtApellidos",4,"Apellidos"))
							if((/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test(jQuery("#txtEmail").val())))
							{	
								if(validar_campo("#txtTelefono",7,"Teléfono móvil"))
									if(validar_campo("#txtContraseniaR",4,""))
										if(validar_campo("#txtContraseniaC",4,""))		
											if(jQuery("#txtContraseniaR").val()==jQuery("#txtContraseniaC").val())	
											{			
												jQuery(".Login-Msj").css({"display": "block"});
												jQuery(".Login-Msj").html("<img src='images/loading.gif' width='50px' />");		
						
												jQuery.ajax(
												{
													//url		: "http://localhost/adminAMPIVillahermosa/ajax/guardarUsuarioGratis.php",
													url		: "http://villahermosa.ampiserver.net/ajax/guardarUsuarioGratis.php",
													type	: "POST",
													data	: 
													{
														txtNombres			: jQuery("#txtNombres").val(),
														txtApellidos		: jQuery("#txtApellidos").val(),											
														txtEmail			: jQuery("#txtEmail").val(),
														txtTelefono			: jQuery("#txtTelefono").val(),
														txtContrasenia		: jQuery("#txtContraseniaR").val()
													},
													success	: function(HTMLRespuesta)
													{			
														var respuesta = parseInt(HTMLRespuesta);	
																		
														//jQuery("#hdNombre").val(jQuery("#txtNombre").val());
														//jQuery("#hdApellidos").val(jQuery("#txtApellidos").val());
														//jQuery("#hdEmail").val(jQuery("#txtEmailC").val());
																		
														jQuery("#txtNombres").val("Nombre (s)");
														jQuery("#txtApellidos").val("Apellidos");
														jQuery("#txtEmail").val("Email");
														jQuery("#txtTelefono").val("Teléfono móvil");
														jQuery("#txtContraseniaR").val("");
														jQuery("#txtContraseniaC").val("");
																		
																		
														if(respuesta == -1)
															jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> EL usuario ya esta registrado.");
														else if(respuesta == 0)
															jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> El usuario no pudo ser registrado.");
														else if(respuesta > 0){
															document.location.href = "#Home";
															jQuery(".Login-Msj").css({"display": "none"});
														}
															
													}
												});		
											}
											else
											{
												jQuery("#txtContraseniaR,#txtContraseniaC").effect('pulsate', { times:2 }, 1000);		
												jQuery("#txtContraseniaR,#txtContraseniaC").focus();   
											} 
							} 
							else
							{
								jQuery("#txtEmail").effect('pulsate', { times:2 }, 1000);		
								jQuery("#txtEmail").focus();   
							}   
				});

				//Boton de login
				jQuery("#btnIngresar").click(function()
				{				
					jQuery(".Login-Msj").css({"display": "block"});
					jQuery(".Login-Msj").html("<img src='images/loading.gif' width='50px' />");				 
	
					if(validar_campo("#txtUsuario",3,"Usuario"))
						if(validar_campo("#txtContrasenia",3,"Contraseña"))
						{												
							jQuery.ajax(
							{														
								//url: "http://localhost/adminAMPIVillahermosa/ajax/login.php",
								url: "http://villahermosa.ampiserver.net/ajax/login.php",
								type	: "POST",
								//dataType	: "html",
								dataType	: "json",
								async    : 	false,		
								data: {"txtUsuario" : jQuery('#txtUsuario').val() , 'txtContrasenia' : jQuery('#txtContrasenia').val() },																
								success: function(data, textStatus, jqXHR) 
								{
									if(data==null)
										jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>Los datos de acceso son incorrectos.</strong><br /> Aseg&uacute;rate de utilizar los datos correctos.");
									else
									{
										//alert(data);
										//jQuery(".Login-Msj").css({"display": "none"});

										localStorage.setItem("Usuario", jQuery('#txtUsuario').val());
										localStorage.setItem("Contrasenia", jQuery('#txtContrasenia').val());

										datosUsuario = data;

										cargarAsociados();
										cargarPropiedades();
										cargarPropiedadesDestacadas();
										cargarNoticias(datosUsuario[0]);
										cargarEventos();
										cargarCapacitaciones();										
										cargarContenidos();
										cargarDatosOptions();
										

										if(datosUsuario[2]!=4)
										{
											cargarAgenda();
											cargarNotificaciones();
											cargarDatosFormulariosPropiedades();

											jQuery("#hdIdVendedorPN").val(datosUsuario[3]);

											var pos =  buscarPosicionAsociado(datosUsuario[3]);

											jQuery(".Perfil-Title").html(listAsociados[pos][1]);
											jQuery(".Perfil-Agente").html(listAsociados[pos][3]+" / "+listAsociados[pos][6]);
											jQuery(".Perfil-Reputacion").html("Reputación: "+listAsociados[pos][17]);
											jQuery(".PerFil-Img img").attr("src",urlBaseAsociado+listAsociados[pos][7])
											jQuery(".Header-Avatar img").attr("src",urlBaseAsociado+listAsociados[pos][7])
											
											jQuery(".Perfil-LinkPerfil").attr("onclick","cargarPerfil("+pos+");");


											jQuery(".PerFil-Btn").removeClass('u-inline-block');
											jQuery(".PerFil-Btn").slideUp('slow');

											jQuery(".icon-icoAgenda").parent().parent().addClass('u-inline-block');										
											jQuery(".icon-icoMensajes").parent().parent().addClass('u-inline-block');
											jQuery(".Home-Title").eq(2).slideDown('slow');
											jQuery(".Home-ListProximosEventos").slideDown('slow');
											jQuery(".Propiedades-MisPropiedades").slideDown('slow');
											jQuery(".CursoNoticia-Compartir").addClass('u-inline-block');
											jQuery(".TitularPropiedad-BtnAgregar").addClass('u-inline-block');
											jQuery(".Propiedades-ItemListMenu--Eventos").parent().addClass('u-inline-block');
											jQuery(".Propiedades-ItemListMenu--Cursos").parent().addClass('u-inline-block');


											jQuery(".icon-icoCompartir").addClass('u-inline-block');

											jQuery(".Perfil-Agente").slideDown('slow');
											jQuery(".Perfil-Reputacion").slideDown('slow');
											jQuery(".Perfil-LinkPerfil").addClass('u-block');
											jQuery(".Perfil-LinkPerfil").slideDown('slow');	
											jQuery(".PerFil-List li").slideDown('slow');
											jQuery(".Ampi-List li").eq(7).slideUp('slow');

											jQuery("#MiPerfil-BtnAgregar").slideDown('slow');


											jQuery("#hdPosAsociadoAgenda").val(pos);
										}

										else if(datosUsuario[2]==4)
										{
											jQuery(".Perfil-Title").html(datosUsuario[3]);
											jQuery("#hdEmail").val(datosUsuario[1]);
											jQuery("#txtTelefonoRC").val(datosUsuario[4]);
											jQuery("#hdIdUsuario").val(datosUsuario[0]);

											jQuery(".PerFil-Img img").attr("src","images/avataras/sinFotoPerfil.jpg");
											jQuery(".Header-Avatar img").attr("src","images/avataras/sinFotoPerfil.jpg");


											jQuery(".PerFil-Btn").addClass('u-inline-block');
										
											jQuery(".icon-icoAgenda").parent().parent().removeClass('u-inline-block');
											jQuery(".icon-icoAgenda").parent().parent().slideUp('slow');
											
											jQuery(".icon-icoMensajes").parent().parent().removeClass('u-inline-block');
											jQuery(".icon-icoMensajes").parent().parent().slideUp('slow');

											jQuery(".Home-Title").eq(2).slideUp('slow');

											jQuery(".Home-ListProximosEventos").slideUp('slow');

											jQuery(".Propiedades-MisPropiedades").slideUp('slow');

											jQuery(".CursoNoticia-Compartir").removeClass('u-inline-block');
											jQuery(".CursoNoticia-Compartir").slideUp('slow');


											jQuery(".TitularPropiedad-BtnAgregar").removeClass('u-inline-block');
											jQuery(".TitularPropiedad-BtnAgregar").slideUp('slow');


											jQuery(".Propiedades-ItemListMenu--Eventos").parent().removeClass('u-inline-block');
											jQuery(".Propiedades-ItemListMenu--Eventos").parent().slideUp('slow');
											jQuery(".Propiedades-ItemListMenu--Cursos").parent().removeClass('u-inline-block');
											jQuery(".Propiedades-ItemListMenu--Cursos").parent().slideUp('slow');


											jQuery(".icon-icoCompartir").removeClass('u-inline-block');
											jQuery(".icon-icoCompartir").slideUp('slow');



											jQuery(".Perfil-Agente").slideUp('slow');
											jQuery(".Perfil-Reputacion").slideUp('slow');
											jQuery(".Perfil-LinkPerfil").removeClass('u-block');
											jQuery(".Perfil-LinkPerfil").slideUp('slow');											
											jQuery(".PerFil-List li").slideUp('slow');
											jQuery(".PerFil-List li").eq(1).slideDown('slow');

											jQuery("#MiPerfil-BtnAgregar").slideUp('slow');
										}
										
										
										//Activar favorito
										jQuery(".Home-icoFavorito").click(function()
										{			
											var tipoFavorito = 0;

											if(jQuery(this).hasClass('activo')){
												tipoFavorito = 0;
												jQuery(this).removeClass('activo');
												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).removeClass('activo');
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).removeClass('activo');

												jQuery("#FavoritosPropiedades-List--Favoritas li.FavoritosPropiedades-ItemList").eq(jQuery(this).data('posicionfavorita')).slideUp('slow');

												var posPD = buscarPosicionPropiedadDestacada(jQuery(this).data('posicion')); 

												if(posPD != -1){
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).removeClass('activo');
												}

												listPropiedades[jQuery(this).data('posicion')][27]=0;
											}
											else {
												tipoFavorito = 1;
												jQuery(this).addClass('activo');
												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).addClass('activo');
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).addClass('activo');

												agregarFavorito(jQuery(this).data('posicion'));

												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).data('posicionfavorita',(punteroFavorito-1));
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).data('posicionfavorita',(punteroFavorito-1));
											
												var posPD = buscarPosicionPropiedadDestacada(jQuery(this).data('posicion')); 
												
												if(posPD != -1){
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).addClass('activo');
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).data('posicionfavorita',(punteroFavorito-1));													
												}

												listPropiedades[jQuery(this).data('posicion')][27]=1;
											}
												
											//alert(jQuery(this).data('propiedad'));
											jQuery.ajax(
											{
												//url		: "http://localhost/adminAMPIVillahermosa/ajax/propiedadFavoritaApp.php",
												url		: "http://villahermosa.ampiserver.net/ajax/propiedadFavoritaApp.php",
												type	: "POST",
												data	: 
													{
														tipo				: tipoFavorito,
														id_propiedad		: jQuery(this).data('propiedad'),											
														id_usuario			: jQuery(this).data('usuario')
													},
													success	: function(HTMLRespuesta)
													{														
													}
											});
										});

										
										//Activar favorito interior detalle propiedad
										jQuery(".DetallePropiedades-BtnAgregar").click(function()
										{
											var tipoFavorito = 0;

											if(jQuery(this).hasClass('activo')){
												tipoFavorito = 0;
												jQuery(this).removeClass('activo');
												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).removeClass('activo');
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).removeClass('activo');

												jQuery("#FavoritosPropiedades-List--Favoritas li.FavoritosPropiedades-ItemList").eq(jQuery(this).data('posicionfavorita')).slideUp('slow');

												var posPD = buscarPosicionPropiedadDestacada(jQuery(this).data('posicion')); 

												if(posPD != -1){
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).removeClass('activo');
												}

												listPropiedades[jQuery(this).data('posicion')][27]=0;
											}
											else {
												tipoFavorito = 1;
												jQuery(this).addClass('activo');
												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).addClass('activo');
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).addClass('activo');

												agregarFavorito(jQuery(this).data('posicion'));

												jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(jQuery(this).data('posicion')).data('posicionfavorita',(punteroFavorito-1));
												jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(jQuery(this).data('posicion')).data('posicionfavorita',(punteroFavorito-1));
											
												var posPD = buscarPosicionPropiedadDestacada(jQuery(this).data('posicion')); 
												
												if(posPD != -1){
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).addClass('activo');
													jQuery("#Home-ListPropiedades--Destacadas .Home-icoFavorito").eq(posPD).data('posicionfavorita',(punteroFavorito-1));													
												}

												listPropiedades[jQuery(this).data('posicion')][27]=1;
											}
												
											//alert(jQuery(this).data('propiedad'));
											jQuery.ajax(
											{
												//url		: "http://localhost/adminAMPIVillahermosa/ajax/propiedadFavoritaApp.php",
												url		: "http://villahermosa.ampiserver.net/ajax/propiedadFavoritaApp.php",
												type	: "POST",
												data	: 
													{
														tipo				: tipoFavorito,
														id_propiedad		: jQuery(this).data('propiedad'),											
														id_usuario			: jQuery(this).data('usuario')
													},
													success	: function(HTMLRespuesta)
													{														
													}
											});
										});



										jQuery(".Login-Msj").css({"display": "none"});
										document.location.href = "#Home";
										jQuery("#txtUsuario").val("Usuario");
										jQuery("#txtContrasenia").val("");
									}								
								}
							})
							.done(function( data, textStatus, jqXHR ) 
							{
							})
							.always(function( data, jqXHR, textStatus, errorThrown ) 
							{
								
							})
							.error(function( data, jqXHR, textStatus, errorThrown ) 
							{
								
								jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>Verifica tu conexión.</strong><br /> No es posible conectar a la red.");
							});
				   		}
				});	




				jQuery("#btnEnviarRecuperacion").click(function()
				{					
					if(validar_campo("#txtEmailRec",4,"Email"))
					{			
						jQuery("#RecuperarContrasenia-Msj").css({"display": "block"});
						jQuery("#RecuperarContrasenia-Msj").html("<img src='images/loading.gif' width='50px' />");		
						
						jQuery.ajax(
						{
							url		: "http://villahermosa.ampiserver.net/modulos/RecuperacionPasswordAPP",
							type	: "POST",
							data	: 
								{
									txtEmail : jQuery("#txtEmailRec").val()
								},
								success	: function(HTMLRespuesta)
								{			
									var respuesta = parseInt(HTMLRespuesta);	
																			
									jQuery("#xtEmailRec").val("Email");																		
																		
									if(respuesta == 0)
										jQuery("#RecuperarContrasenia-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> El E-mail no existe.");
									else if(respuesta == 1){
										jQuery("#RecuperarContrasenia-Msj").html("<strong class='u-mayuscula u-inline-block'>Aviso:</strong><br /> En breve recibira el correo de recuperación.");											
									}

									setTimeout(function(){
										jQuery("#RecuperarContrasenia-Msj").css({"display": "none"});
										document.location.href = "#Login";
									},3000);
														
								}
						});						
					}
				});



				
				jQuery(".CompletaTuRegistro-BtnActualizar").click(function()
				{				
					if(validar_campoEspecial("#flImgFoto","#CompletaTuRegistro-Foto",0,2, ""))	
						if(validar_campo("#txtNombresRC",3,"Nombre(s)"))
							if(validar_campo("#txtApellidoPRC",3,"Apellido Paterno"))
								if(validar_campo("#txtApellidoMRC",3,"Apellido Materno"))
									if(validar_campoSelect("#stTipoMembresia",".CompletaTuRegistro-Center .fancy-select",0,0,"0"))
										if(validar_campo("#txtResenaRC",3,"Reseña"))
											if(validarInmobiliaria())
												if(validar_campo("#txtTelefonoRC",2,"Teléfono"))
													if(validar_campoEspecial("#flHojaDatosPersonales",".CompletaTuRegistro-BtnAdjuntar",0,2, ""))
														if(validar_campoEspecial("#flSolicitudIngreso",".CompletaTuRegistro-BtnAdjuntar",1,2, ""))
															if(validar_campoEspecial("#flVoucherPago",".CompletaTuRegistro-BtnAdjuntar",2,2, ""))
															{
																jQuery(".CompletaTuRegistro-Msj").css({"display": "block"});
																jQuery(".CompletaTuRegistro-Msj").html("<img src='images/loading.gif' width='50px' />");

																var formData = new FormData(document.getElementById("formCompletaTuRegistro"));

																jQuery.ajax(
																{
																	//url: "http://localhost/adminAMPIVillahermosa/ajax/guardar_miembroApp.php",
																	url: "http://villahermosa.ampiserver.net/ajax/guardar_miembroApp.php",					
																	type	: "POST",
																	data	: formData,
																	cache: false,
																	contentType: false,
																	processData: false,
																	success	: function(Respuesta)
																	{				
																		//jQuery(".CompletaTuRegistro-Msj").html(Respuesta);

																		var respuesta = parseInt(Respuesta);

																		if(respuesta == -1)
																			jQuery(".CompletaTuRegistro-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se han podido subir los archivos.");
																		else if(respuesta == 0)
																			jQuery(".CompletaTuRegistro-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se ha podido completar tu registro.");
																		else if(respuesta > 0)
																			jQuery(".CompletaTuRegistro-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Muchas gracias!</strong><br /> Su registro ha sido completado.");
																			
																			setTimeout(function(){
																				jQuery("#formCompletaTuRegistro")[0].reset();
																				jQuery(".CompletaTuRegistro-ListCursosRegistrados").html("");
																				jQuery(".CompletaTuRegistro-Msj").css({"display": "none"});

																				document.location.href = "#Login";
																				location.reload();
																			},3000);
																	}
																});
															}
				});

				jQuery(".CompletaTuRegistro-BtnAgregar").click(function()
				{				
					if(validar_campoSelect("#stTipoCurso",".CompletaTuRegistro-Center .fancy-select",2,0,"0"))
						if(validar_campo("#txtNombreCurso",3,"Nombre"))
							if(validar_campoEspecial("#flArchivoCurso",".CompletaTuRegistro-BtnAdjuntar",3,2, ""))
							{
								jQuery("#flArchivoCurso").upload('http://villahermosa.ampiserver.net/ajax/guardar_capatacionExternaApp.php',
								{			
									txtNombreCurso	: jQuery("#txtNombreCurso").val(),
									stTipoCurso		: jQuery("#stTipoCurso").val()
								},
								function(respuesta) 
								{
									if(jQuery("#hdListCapacitaciones").val()=="")
										jQuery("#hdListCapacitaciones").val(parseInt(respuesta));
									else
										jQuery("#hdListCapacitaciones").val(jQuery("#hdListCapacitaciones").val()+","+parseInt(respuesta));

									jQuery(".CompletaTuRegistro-ListCursosRegistrados").append("<li>- "+jQuery("#txtNombreCurso").val()+"</li>");

									jQuery("#txtNombreCurso").val("Nombre");
									jQuery("#flArchivoCurso").val("");
								});
							}
				});

				//Validar independiente
				jQuery("#cbIndependiente").click(function()
				{
					if(jQuery(this).is(':checked'))
						jQuery(".CompletaTuRegistro-FilaInmobiliaria").slideUp('slow');
					else
						jQuery(".CompletaTuRegistro-FilaInmobiliaria").slideDown('slow');
				});

				jQuery(".PerFil-List li a").click(function(){
					jQuery(".PerFil-Blur").click();
				});


				jQuery(".MiPerfil-ItemListEstrellas").each(function(a){

					jQuery(this).click(function(){

						var calificacion = 2;

						jQuery(".MiPerfil-ItemListEstrellas").removeClass("activo");

						jQuery(this).addClass("activo");

						if(a==1)
						{
							jQuery(".MiPerfil-ItemListEstrellas").eq(0).addClass("activo");								
							calificacion = 4;						
						}
						else if(a==2)
						{
							jQuery(".MiPerfil-ItemListEstrellas").eq(0).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(1).addClass("activo");
							calificacion = 6;
						}
						else if(a==3)
						{
							jQuery(".MiPerfil-ItemListEstrellas").eq(0).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(1).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(2).addClass("activo");
							calificacion = 8;
						}
						else if(a==4)
						{
							jQuery(".MiPerfil-ItemListEstrellas").eq(0).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(1).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(2).addClass("activo");
							jQuery(".MiPerfil-ItemListEstrellas").eq(3).addClass("activo");
							calificacion = 10;
						}

						jQuery.ajax(
						{
							//url		: "http://localhost/adminAMPIVillahermosa/ajax/calificacionUsuarioApp.php",
							url		: "http://villahermosa.ampiserver.net/ajax/calificacionUsuarioApp.php",
							type	: "POST",
							data	: 
									{
										id_asociado			: jQuery(this).data('idA'),											
										id_usuario			: jQuery(this).data('idU'),
										calificacionA		: calificacion
									},
									success	: function(HTMLRespuesta)
									{
										jQuery("#PerfilContacto .MiPerfil-Reputacion").html("Reputación: "+HTMLRespuesta);
									}
						});
					});
				});
				

				//Inscripcion a evento
				jQuery("#PagoEvento-BtnPagoEvento").click(function()
				{				
					if(validar_campoEspecial("#flVoucherPagoEvento",".PagoEvento-BtnAdjuntar",0,2, ""))
					{
						jQuery("#PagoEvento-MsjEvento").css({"display": "block"});
						jQuery("#PagoEvento-MsjEvento").html("<img src='images/loading.gif' width='50px' />");

						jQuery("#flVoucherPagoEvento").upload('http://villahermosa.ampiserver.net/ajax/guardar_inscripcionEventoApp.php',
						{			
							id_evento		: jQuery("#hdIdEventoPagoEvento").val(),
							id_usuario		: jQuery("#hdIdUsuarioPagoEvento").val()
						},
						function(respuesta) 
						{
							var r =  parseInt(respuesta);
							
							if(r==1){
								jQuery("#PagoEvento-MsjEvento").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> Haz quedado inscripto.");
								listEventos[jQuery("#hdPosEventoPago").val()][29]=1;

								var listEventosAgenda = new Array();
								listEventosAgenda = datosUsuario[4];

								var tEA = listEventosAgenda.length;

								var posEV =  buscarPosicionEvento(jQuery("#hdIdEventoPagoEvento").val());

								listEventosAgenda[tEA] = new Array();
								listEventosAgenda[tEA][0]  = jQuery("#hdIdEventoPagoEvento").val();
								listEventosAgenda[tEA][1]  = 1;
								listEventosAgenda[tEA][2]  = listEventos[posEV][8];

								cargarAgenda();
							}
							else if(r<1)
								jQuery("#PagoEvento-MsjEvento").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> No se ha podido realizar tu inscripción.");
							

							jQuery(".PagoEvento-TxtArchivoAdjunto span").eq(0).html("");
							jQuery("#flVoucherPagoEvento").val("");

							setTimeout(function(){
								jQuery("#PagoEvento-MsjEvento").css({"display": "none"});
								jQuery("#PagoEvento-BtnPagoEvento").slideUp("slow");

								jQuery("#InscripcionEvento .PostNoticia-Regresar").click();
							},3000);
						});
					}
				});


				//Enviar correo de Inscripcion a evento
				jQuery("#CursosNoticias-BtnInscribirme").click(function()
				{
					jQuery("#CursosNoticias-MsjEvento").css({"display": "block"});
					jQuery("#CursosNoticias-MsjEvento").html("<img src='images/loading.gif' width='50px' />");

					jQuery.ajax(
					{
						url		: "http://villahermosa.ampiserver.net/ajax/enviar_correoInscripcionEventoApp.php",
						type	: "POST",
						data	: 
								{
									id_evento		: jQuery("#hdIdEventoPagoEvento").val(),
									id_usuario		: jQuery("#hdIdUsuarioPagoEvento").val()
								},
								success	: function(HTMLRespuesta)
								{

									jQuery("#CursosNoticias-MsjEvento").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> En breve llegará un email a tu correo electrónico.");

									setTimeout(function(){
										jQuery("#CursosNoticias-MsjEvento").css({"display": "none"});
										jQuery("#CursosNoticias-BtnInscribirmeGratis").slideUp("slow");
									},3000);
								}
					});

				});
				
				//Inscripcion a evento gratis
				jQuery("#CursosNoticias-BtnInscribirmeGratis").click(function()
				{
					jQuery("#CursosNoticias-MsjEvento").css({"display": "block"});
					jQuery("#CursosNoticias-MsjEvento").html("<img src='images/loading.gif' width='50px' />");

					jQuery.ajax(
					{
						//url		: "http://localhost/adminAMPIVillahermosa/ajax/guardar_inscripcionEventoGratisApp.php",
						url		: "http://villahermosa.ampiserver.net/ajax/guardar_inscripcionEventoGratisApp.php",
						type	: "POST",
						data	: 
								{
									id_evento		: jQuery("#hdIdEventoPagoEvento").val(),
									id_usuario		: jQuery("#hdIdUsuarioPagoEvento").val()
								},
								success	: function(HTMLRespuesta)
								{
									var r =  parseInt(HTMLRespuesta);
							
									if(r==1){
										jQuery("#CursosNoticias-MsjEvento").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> Haz quedado inscripto.");
										listEventos[jQuery("#hdPosEventoPago").val()][29]=1;

										
										var listEventosAgenda = new Array();
										listEventosAgenda = datosUsuario[4];

										var tEA = listEventosAgenda.length;

										var posEV = buscarPosicionEvento(jQuery("#hdIdEventoPagoEvento").val());

										listEventosAgenda[tEA] = new Array();
										listEventosAgenda[tEA][0] = jQuery("#hdIdEventoPagoEvento").val();
										listEventosAgenda[tEA][1] = 1;
										listEventosAgenda[tEA][2] = listEventos[posEV][8];

										cargarAgenda();
									}
										
									else if(r<1)
										jQuery("#CursosNoticias-MsjEvento").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> No se ha podido realizar tu inscripción.");
									

									setTimeout(function(){
										jQuery("#CursosNoticias-MsjEvento").css({"display": "none"});
										jQuery("#CursosNoticias-BtnInscribirmeGratis").slideUp("slow");
									},3000);
								}
					});

				});

				jQuery("#flVoucherPagoEvento").change(function(){
					var archivo = jQuery(this).val().split('\\'); 									
					jQuery(".PagoEvento-TxtArchivoAdjunto span").eq(0).html(archivo[archivo.length-1]);					
				});


				//Inscripcion a Capacitacion
				jQuery("#PagoEvento-BtnPagoCapacitacion").click(function()
				{				
					if(validar_campoEspecial("#flVoucherPagoCapacitacion",".PagoEvento-BtnAdjuntar",1,2, ""))
					{
						jQuery("#PagoEvento-MsjCapacitacion").css({"display": "block"});
						jQuery("#PagoEvento-MsjCapacitacion").html("<img src='images/loading.gif' width='50px' />");

						jQuery("#flVoucherPagoCapacitacion").upload('http://villahermosa.ampiserver.net/ajax/guardar_inscripcionCapacitacionApp.php',
						{			
							id_capacitacion		: jQuery("#hdIdCapacitacionPagoCapacitacion").val(),
							id_usuario			: jQuery("#hdIdUsuarioPagoCapacitacion").val()
						},
						function(respuesta) 
						{
							var r =  parseInt(respuesta);
							
							if(r==1){
								jQuery("#PagoEvento-MsjCapacitacion").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> Haz quedado inscripto.");
								listCapacitaciones[jQuery("#hdPosCapacitacionPago").val()][28]=1;

								
								var listCapacitacionesAgenda = new Array();
								listCapacitacionesAgenda = datosUsuario[5];		

								var tCA = listCapacitacionesAgenda.length;

								var posCV = buscarPosicionCapacitacion(jQuery("#hdIdCapacitacionPagoCapacitacion").val());

								listCapacitacionesAgenda[tCA] = new Array();
								listCapacitacionesAgenda[tCA][0] = jQuery("#hdIdCapacitacionPagoCapacitacion").val();
								listCapacitacionesAgenda[tCA][1] = 2;
								listCapacitacionesAgenda[tCA][2] = listCapacitaciones[posCV][7];

								cargarAgenda();
							}
								
							else if(r<1)
								jQuery("#PagoEvento-MsjCapacitacion").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> No se ha podido realizar tu inscripción.");
							

							jQuery(".PagoEvento-TxtArchivoAdjunto span").eq(1).html("");
							jQuery("#flVoucherPagoCapacitacion").val("");

							setTimeout(function(){
								jQuery("#PagoEvento-MsjCapacitacion").css({"display": "none"});
								jQuery("#PagoEvento-BtnPagoCapacitacion").slideUp("slow");

								jQuery("#InscripcionCapacitacion .PostNoticia-Regresar").click();
							},3000);
						});
					}
				});

				//Enviar correo de Inscripcion a capacitacion
				jQuery("#CursosNoticias-BtnInscribirmeCapaticacion").click(function()
				{
					jQuery("#CursosNoticias-MsjCapacitacion").css({"display": "block"});
					jQuery("#CursosNoticias-MsjCapacitacion").html("<img src='images/loading.gif' width='50px' />");					

					jQuery.ajax(
					{
						url		: "http://villahermosa.ampiserver.net/ajax/enviar_correoInscripcionCapacitacionApp.php",
						type	: "POST",
						data	: 
								{									
									id_capacitacion		: jQuery("#hdIdCapacitacionPagoCapacitacion").val(),
									id_usuario			: jQuery("#hdIdUsuarioPagoCapacitacion").val()
								},
								success	: function(HTMLRespuesta)
								{									
									jQuery("#CursosNoticias-MsjCapacitacion").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> En breve llegará un email a tu correo electrónico.");

									setTimeout(function(){
										jQuery("#CursosNoticias-MsjCapacitacion").css({"display": "none"});
										jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").slideUp("slow");
									},3000);
								}
					});

				});

				//Inscripcion a capacitacion gratis
				jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").click(function()
				{
					jQuery("#CursosNoticias-MsjCapacitacion").css({"display": "block"});
					jQuery("#CursosNoticias-MsjCapacitacion").html("<img src='images/loading.gif' width='50px' />");

					jQuery.ajax(
					{
						//url		: "http://localhost/adminAMPIVillahermosa/ajax/guardar_inscripcionEventoGratisApp.php",
						url		: "http://villahermosa.ampiserver.net/ajax/guardar_inscripcionCapacitacionGratisApp.php",
						type	: "POST",
						data	: 
								{
									id_capacitacion		: jQuery("#hdIdCapacitacionPagoCapacitacion").val(),
									id_usuario			: jQuery("#hdIdUsuarioPagoCapacitacion").val()
								},
								success	: function(HTMLRespuesta)
								{
									var r =  parseInt(HTMLRespuesta);
							
									if(r==1){
										jQuery("#CursosNoticias-MsjCapacitacion").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> Haz quedado inscripto.");
										listCapacitaciones[jQuery("#hdPosCapacitacionPago").val()][28]=1;

										var listCapacitacionesAgenda = new Array();
										listCapacitacionesAgenda = datosUsuario[5];		

										var tCA = listCapacitacionesAgenda.length;

										var posCV = buscarPosicionCapacitacion(jQuery("#hdIdCapacitacionPagoCapacitacion").val());

										listCapacitacionesAgenda[tCA] = new Array();
										listCapacitacionesAgenda[tCA][0] = jQuery("#hdIdCapacitacionPagoCapacitacion").val();
										listCapacitacionesAgenda[tCA][1] = 2;
										listCapacitacionesAgenda[tCA][2] = listCapacitaciones[posCV][7];

										cargarAgenda();
									}
										
									else if(r<1)
										jQuery("#CursosNoticias-MsjCapacitacion").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> No se ha podido realizar tu inscripción.");
									

									setTimeout(function(){
										jQuery("#CursosNoticias-MsjCapacitacion").css({"display": "none"});
										jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").slideUp("slow");
									},3000);
								}
					});

				});


				jQuery("#flVoucherPagoCapacitacion").change(function(){
					var archivo = jQuery(this).val().split('\\'); 									
					jQuery(".PagoEvento-TxtArchivoAdjunto span").eq(1).html(archivo[archivo.length-1]);					
				});



				jQuery("#MiPerfil-BtnAgregar").click(function()
				{
					jQuery("#MiPerfil-MsjBtnAgregar").css({"display": "block"});
					jQuery("#MiPerfil-MsjBtnAgregar").html("<img src='images/loading.gif' width='50px' />");

					jQuery.ajax(
					{
						//url		: "http://localhost/adminAMPIVillahermosa/ajax/propiedadFavoritaApp.php",
						url		: "http://villahermosa.ampiserver.net/ajax/agregarAContactosApp.php",
						type	: "POST",
						data	: 
							{
								id_asociado		: jQuery("#hdIdAsociadoAgregarAgenda").val(),											
								id_usuario		: jQuery("#hdIdUsuarioAgregarAgenda").val()
							},
							success	: function(HTMLRespuesta)
							{				
								var r =  parseInt(HTMLRespuesta);
							
								if(r==1){
									jQuery("#MiPerfil-MsjBtnAgregar").html("<strong class='u-mayuscula u-inline-block'>Informe: </strong><br /> Sea agregado el usuario a tus contactos.");
									

									//cargarAsociados();

									var listContactosAsociados = new Array();							
									listContactosAsociados = listAsociados[jQuery("#hdPosAsociadoAgenda").val()][18];
									
									listContactosAsociados.push(jQuery("#hdIdAsociadoAgregarAgenda").val());

									//console.log(listContactosAsociados);

									//console.log(listAsociados);

									//alert(listContactosAsociados.length);
									//listContactosAsociados[listContactosAsociados.length] = jQuery("#hdIdAsociadoAgregarAgenda").val();	
									//alert(listContactosAsociados.length);		

									//listAsociados[jQuery("#hdPosAsociadoAgenda").val()][18] = new Array();
									//alert(listContactosAsociados.length);
									//listAsociados[jQuery("#hdPosAsociadoAgenda").val()][18] = listContactosAsociados;
								}	
								else if(r==0)
									jQuery("#MiPerfil-MsjBtnAgregar").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> No se ha podido agregar el usuario a tus contactos.");
								else if(r==-1)
									jQuery("#MiPerfil-MsjBtnAgregar").html("<strong class='u-mayuscula u-inline-block'>Informe: </strong><br /> El usuario ya esta en tus contactos.");
							
							
								setTimeout(function(){
									jQuery("#MiPerfil-MsjBtnAgregar").css({"display": "none"});
								},3000);
							}
					});
				});

				jQuery("#SolcitarCita-BtnEnviar").click(function()
				{					
					if(validar_campo("#txtAsuntoCita",3,"Asunto"))
						if(validar_campo("#txtMensajeCita",3,"Mensaje"))
							if(validar_campo("#txtFechaCita",7,"Fecha de la cita"))
									if(validar_campo("#txtHoraCita",4,"Hora de la cita"))
									{			
										jQuery("#SolcitarCita-Msj").css({"display": "block"});
										jQuery("#SolcitarCita-Msj").html("<img src='images/loading.gif' width='50px' />");		
						
										jQuery.ajax(
										{
											url		: "http://villahermosa.ampiserver.net/ajax/guardarSolicitudCitaApp.php",
											type	: "POST",
											data	: 
											{
												id_usuario 			: datosUsuario[0],
												id_tipo_usuario		: datosUsuario[2],
												id_asociado			: jQuery("#hdAgentePropiedad").val(),
												txtAsuntoCita		: jQuery("#txtAsuntoCita").val(),
												txtMensajeCita		: jQuery("#txtMensajeCita").val(),											
												txtFechaCita		: jQuery("#txtFechaCita").val(),
												txtHoraCita			: jQuery("#txtHoraCita").val()
											},
											success	: function(HTMLRespuesta)
											{			
												var respuesta = parseInt(HTMLRespuesta);	
																		
												jQuery("#txtAsuntoCita").val("Asunto");
												jQuery("#txtMensajeCita").val("Mensaje");
												jQuery("#txtFechaCita").val("Fecha de la cita");
												jQuery("#txtHoraCita").val("Hora de la cita");
																														
												if(respuesta == 0)
													jQuery("#SolcitarCita-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se ha podido solicitar la cita.");
												else if(respuesta == 1){
													jQuery("#SolcitarCita-Msj").html("<strong class='u-mayuscula u-inline-block'>Infome:</strong><br /> La cita ha sido solicitada.");
															
													setTimeout(function(){
														jQuery("#SolcitarCita-Msj").css({"display": "none"});
														jQuery("#SolicitarCitaPropiedad .PostNoticia-Regresar").click();
													},3000);
												}		
											}
										});		
									}
				});


				jQuery(".InteriorNotificaciones-Btn--Rechazar").click(function(){

					if(validar_campo("#hdIdAgenda",1,"")){
						jQuery("#InteriorNotificaciones-Msj").css({"display": "block"});
						jQuery("#InteriorNotificaciones-Msj").html("<img src='images/loading.gif' width='50px' />");	

						jQuery.ajax(
							{
								url		: "http://villahermosa.ampiserver.net/ajax/rechazarSolicitudApp.php",
								type	: "POST",
								data	: 
								{
									id_agenda 	: jQuery("#hdIdAgenda").val()
								},
								success	: function(HTMLRespuesta)
								{			
									var respuesta = parseInt(HTMLRespuesta);	
															
							
									if(respuesta == 1){
										jQuery("#InteriorNotificaciones-Msj").html("<strong class='u-mayuscula u-inline-block'>Infome:</strong><br /> La operacion se ha realizado con exito.");
												
										setTimeout(function(){
											jQuery("#InteriorNotificaciones-Msj").css({"display": "none"});
											jQuery("#InteriorNotificacion .PostNoticia-Regresar").click();

											
											var posAN = buscarPosicionAgenda(jQuery("#hdIdAgenda").val());

											listAgendaG.splice(posAN, 1);


											cargarNotificaciones();

										},1000);
									}		
								}
							});
					}
				});

				jQuery(".InteriorNotificaciones-Btn--Aceptar").click(function(){

					if(validar_campo("#hdIdAgenda",1,"")){
						jQuery("#InteriorNotificaciones-Msj").css({"display": "block"});
						jQuery("#InteriorNotificaciones-Msj").html("<img src='images/loading.gif' width='50px' />");	

						jQuery.ajax(
							{
								url		: "http://villahermosa.ampiserver.net/ajax/aceptarSolicitudApp.php",
								type	: "POST",
								data	: 
								{
									id_agenda 	: jQuery("#hdIdAgenda").val()
								},
								success	: function(HTMLRespuesta)
								{			
									var respuesta = parseInt(HTMLRespuesta);	
															
							
									if(respuesta == 1){
										jQuery("#InteriorNotificaciones-Msj").html("<strong class='u-mayuscula u-inline-block'>Infome:</strong><br /> La operacion se ha realizado con exito.");
												
										setTimeout(function(){
											jQuery("#InteriorNotificaciones-Msj").css({"display": "none"});
											jQuery("#InteriorNotificacion .PostNoticia-Regresar").click();

											
											var posAN = buscarPosicionAgenda(jQuery("#hdIdAgenda").val())

											listAgendaG[posAN][11] = 1;

											cargarNotificaciones();
											cargarAgenda();

										},1000);
									}		
								}
							});
					}
				});


				jQuery('#flImgPropiedadSlider').change(function()
				{ 
					var file = jQuery("#flImgPropiedadSlider")[0].files[0];
					var fileName = file.name;
						
					jQuery("#NuevaPropiedad-MsjSlider").css({"display": "block"});
					jQuery('#NuevaPropiedad-MsjSlider').html("<img width='50px' src='images/loading.gif' />");
						
					jQuery("#flImgPropiedadSlider").upload('http://villahermosa.ampiserver.net/ajax/subir_SliderPropiedad.php',
					 {			
					 },
					 function(respuesta) 
					 {
					 	var slider = jQuery('#sliderNP');
						   
					   	if(slider.val()=="")
							slider.val(respuesta);
					   	else
							slider.val(slider.val()+","+respuesta);
							
						jQuery("#NuevaPropiedad .NuevaPropiedad-ListImages").append("<li class='u-inline-block'><a class='u-inline-block'><span class='u-position-absolute u-inline-block' onclick='eliminar_sliderPropiedad("+tSlider+","+respuesta+")'>X</span><img src='http://villahermosa.ampiserver.net/modulos/assets/fileClient/"+respuesta+"_"+fileName+"'></a></li>");

						jQuery('#NuevaPropiedad-MsjSlider').html("");

						tSlider++;
					 });
				});
				
				jQuery('#flImgEditarPropiedadSlider').change(function()
				{ 
					var file = jQuery("#flImgEditarPropiedadSlider")[0].files[0];
					var fileName = file.name;
					
					jQuery("#EditarPropiedad-MsjSlider").css({"display": "block"});
					jQuery('#EditarPropiedad-MsjSlider').html("<img width='50px' src='images/loading.gif' />");
						
					jQuery("#flImgEditarPropiedadSlider").upload('http://villahermosa.ampiserver.net/ajax/subir_SliderPropiedad.php',
					 {			
					 },
					 function(respuesta) 
					 {
					 	var slider = jQuery('#sliderEP');
						   
					   	if(slider.val()=="")
							slider.val(respuesta);
					   	else
							slider.val(slider.val()+","+respuesta);
							
						jQuery("#EditarPropiedad .NuevaPropiedad-ListImages").append("<li class='u-inline-block'><a class='u-inline-block'><span class='u-position-absolute u-inline-block' onclick='eliminar_sliderPropiedad("+tSlider+","+respuesta+")'>X</span><img src='http://villahermosa.ampiserver.net/modulos/assets/fileClient/"+respuesta+"_"+fileName+"'></a></li>");

						jQuery('#EditarPropiedad-MsjSlider').html("");

						tSlider++;
					 });
				});


				jQuery('#NuevaPropiedad-BtnAgregarCaracteristica').click(function()
                {                  
				  	if(validar_campo("#txtAgregarCaracteristicaNP",2,"Nueva característica"))
					{
						var caracteristica = jQuery('#txtAgregarCaracteristicaNP').val();
						  
						jQuery('#NuevaPropiedad-MsjAgregarC').css({"display":"block"});
						  
						jQuery.ajax(
						{
							url			:"http://villahermosa.ampiserver.net/ajax/agregar_caracteristicaApp.php",
							data		:
										{
											txtCaracteristica	: jQuery('#txtAgregarCaracteristicaNP').val()
										},
							type		: "POST",
							dataType	: "html",
							success		: function(Respuesta)
									  {
										Respuesta = parseInt(Respuesta);
										jQuery('.NuevaPropiedad-List').eq(2).append("<li class='FiltrosPropiedades-ColCheckbox u-inline-block'><input checked name='cbCaracteristicaNP"+jQuery('#num_caracteristicaNP').val()+"' id='cbCaracteristicaNP"+jQuery('#num_caracteristicaNP').val()+"' type='checkbox' value='"+Respuesta+"'><label class='lbCheckbox' for='cbCaracteristicaNP"+jQuery('#num_caracteristicaNP').val()+"'>"+caracteristica+"</label></li>");
										jQuery('#num_caracteristicaNP').val(parseInt(jQuery('#num_caracteristicaNP').val())+1);
									  }
						 	});			  
					   	}
						
						jQuery('#NuevaPropiedad-MsjAgregarC').css({"display":"none"});
						jQuery('#txtAgregarCaracteristicaNP').val("Nueva característica");
				});


				jQuery('#NuevaPropiedad-BtnAgregarZona').click(function()
                {                  
				  	if(validar_campo("#txtAgregarZonaNP",2,"Nueva zona"))
					{
						var zona= jQuery('#txtAgregarZonaNP').val();
						  
						jQuery('#NuevaPropiedad-MsjAgregarZ').css({"display":"block"});
						  
						jQuery.ajax(
						{
							url			:"http://villahermosa.ampiserver.net/ajax/agregar_zonaApp.php",
							data		:
										{
											txtZona	: jQuery('#txtAgregarZonaNP').val()
										},
							type		: "POST",
							dataType	: "html",
							success		: function(Respuesta)
									  {
										Respuesta = parseInt(Respuesta);
										jQuery('.NuevaPropiedad-List').eq(0).append("<li class='FiltrosPropiedades-ColCheckbox u-inline-block'><input checked name='rbZonaNP' id='rbZonaNP"+Respuesta+"' type='radio' value='"+Respuesta+"'><label class='lbRadio' for='rbZonaNP"+Respuesta+"'>"+zona+"</label></li>");
																				
										jQuery('#num_zonasNP').val(parseInt(jQuery('#num_zonasNP').val())+1);
									  }
						 	});			  
					   	}
						
						jQuery('#NuevaPropiedad-MsjAgregarZ').css({"display":"none"});
						jQuery('#txtAgregarZonaNP').val("Nueva zona");
				});


				jQuery('#NuevaPropiedad-BtnNueva').click(function()
                {    
					if(validar_campoEspecial("#flImgPropiedadSlider",".NuevaPropiedad-BtnSubirSlider",0,2, ""))	
						if(validar_campo("#txtTituloNP",3,"Título"))
							if(validar_campo("#txtDescripcionNP",3,"Descripción"))
								if(validar_campo("#txtPrecioNP",3,"Precio"))
									if(validar_campoSelect("#stTipoPropiedadNP",".NuevaPropiedad-Campos .fancy-select",0,0,"0"))
										if(validar_campoSelect("#stOperacionPropiedadNP",".NuevaPropiedad-Campos .fancy-select",1,0,"0"))
											if(validar_campoSelect("#stOperacionCompartidaNP",".NuevaPropiedad-Campos .fancy-select",2,-1,"-1"))
												if(validar_campo("#txtDireccionNP",0,"Dirección"))
													if(validar_campo("#txtFechaPublicacionNP",8,"Fecha de publicación"))
													{
														jQuery("#NuevaPropiedad-MsjNueva").css({"display": "block"});
														jQuery("#NuevaPropiedad-MsjNueva").html("<img src='images/loading.gif' width='50px' />");

														var formData = new FormData(document.getElementById("formNuevaPropiedad"));

														jQuery.ajax(
														{
															url: "http://villahermosa.ampiserver.net/ajax/guardar_propiedadApp.php",					
															type	: "POST",
															data	: formData,
															cache: false,
															contentType: false,
															processData: false,
															success	: function(Respuesta)
															{				
																var respuesta = parseInt(Respuesta);

																if(respuesta == 0)
																	jQuery("#NuevaPropiedad-MsjNueva").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se ha podido subir la propiedad.");
																else if(respuesta == 1)
																	jQuery("#NuevaPropiedad-MsjNueva").html("<strong class='u-mayuscula u-inline-block'>¡Muchas gracias!</strong><br /> La propiedad se ha subido con exito.");
																				
																	setTimeout(function(){
																		jQuery("#formNuevaPropiedad")[0].reset();
																		
																		jQuery("#NuevaPropiedad .NuevaPropiedad-ListImages").html("");
																		jQuery("#sliderNP").val("");

																		jQuery("#NuevaPropiedad-MsjNueva").css({"display": "none"});

																		jQuery('.NuevaPropiedad-Campos .lista').trigger('update');

																		cargarPropiedades();
																	},3000);
															}
														});
													}
				});


				jQuery('#EditarPropiedad-BtnNueva').click(function()
                {    
					if(validar_campo("#txtTituloEP",3,"Título"))
							if(validar_campo("#txtDescripcionEP",3,"Descripción"))
								if(validar_campo("#txtPrecioEP",3,"Precio"))
									if(validar_campoSelect("#stTipoPropiedadEP","#EditarPropiedad .NuevaPropiedad-Campos .fancy-select",0,0,"0"))
										if(validar_campoSelect("#stOperacionPropiedadEP","#EditarPropiedad .NuevaPropiedad-Campos .fancy-select",1,0,"0"))
											if(validar_campoSelect("#stOperacionCompartidaEP","#EditarPropiedad .NuevaPropiedad-Campos .fancy-select",2,-1,"-1"))
												if(validar_campo("#txtDireccionEP",0,"Dirección"))
													if(validar_campo("#txtFechaPublicacionEP",8,"Fecha de publicación"))
													{
														jQuery("#EditarPropiedad-MsjNueva").css({"display": "block"});
														jQuery("#EditarPropiedad-MsjNueva").html("<img src='images/loading.gif' width='50px' />");

														var formData = new FormData(document.getElementById("formEditarPropiedad"));

														jQuery.ajax(
														{
															url: "http://villahermosa.ampiserver.net/ajax/editar_propiedadApp.php",					
															type	: "POST",
															data	: formData,
															cache: false,
															contentType: false,
															processData: false,
															success	: function(Respuesta)
															{
																var respuesta = parseInt(Respuesta);

																if(respuesta == 0)
																	jQuery("#EditarPropiedad-MsjNueva").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se ha podido subir la propiedad.");
																else if(respuesta == 1)
																	jQuery("#EditarPropiedad-MsjNueva").html("<strong class='u-mayuscula u-inline-block'>¡Muchas gracias!</strong><br /> La propiedad se ha editado con éxito.");
																				
																	setTimeout(function(){
																		
																		jQuery("#EditarPropiedad-MsjNueva").css({"display": "none"});

																		cargarPropiedades();
																	},3000);
															}
														});
													}
				});



				//Agregar caracteristica editar propiedad
				jQuery('#EditarPropiedad-BtnAgregarCaracteristica').click(function()
                {                  
				  	if(validar_campo("#txtAgregarCaracteristicaEP",2,"Nueva característica"))
					{
						var caracteristica = jQuery('#txtAgregarCaracteristicaEP').val();
						  
						jQuery('#EditarPropiedad-MsjAgregarC').css({"display":"block"});
						  
						jQuery.ajax(
						{
							url			:"http://villahermosa.ampiserver.net/ajax/agregar_caracteristicaApp.php",
							data		:
										{
											txtCaracteristica	: jQuery('#txtAgregarCaracteristicaEP').val()
										},
							type		: "POST",
							dataType	: "html",
							success		: function(Respuesta)
									  {
										Respuesta = parseInt(Respuesta);
										jQuery('.NuevaPropiedad-List').eq(3).append("<li class='FiltrosPropiedades-ColCheckbox u-inline-block'><input checked name='cbCaracteristicaEP"+jQuery('#num_caracteristicaEP').val()+"' id='cbCaracteristicaEP"+jQuery('#num_caracteristicaEP').val()+"' type='checkbox' value='"+Respuesta+"'><label class='lbCheckbox' for='cbCaracteristicaEP"+jQuery('#num_caracteristicaEP').val()+"'>"+caracteristica+"</label></li>");
										jQuery('#num_caracteristicaEP').val(parseInt(jQuery('#num_caracteristicaEP').val())+1);
									  }
						 	});			  
					   	}
						
						jQuery('#EditarPropiedad-MsjAgregarC').css({"display":"none"});
						jQuery('#txtAgregarCaracteristicaEP').val("Nueva característica");
				});



				jQuery('#FiltrosPropiedades-Btn').click(function()
                {    
					jQuery("#FiltrosPropiedades-Msj").css({"display": "block"});
					jQuery("#FiltrosPropiedades-Msj").html("<img src='images/loading.gif' width='50px' />");

					var formData = new FormData(document.getElementById("formFiltrarPropiedad"));
					formData.append("id_usuario", datosUsuario[0]);
					

					jQuery.ajax(
					{
						url: "http://villahermosa.ampiserver.net/ajax/propiedades.php",						
						type	: "POST",
						data	: formData,
						cache  : false,
						contentType: false,
						processData: false,
						dataType : "json",
						success	: function(Respuesta)
						{				
							//console.log(Respuesta);

							listPropiedades = Respuesta;	
							
							var itemsPropiedad = "";
							var itemsPropiedadLista = "";
							var itemsPropiedadFavorita = "";
							var itemsMiPropiedad = "";

							jQuery("#Home-ListPropiedades--Propiedades").html("");
							jQuery("#FavoritosPropiedades-List--Lista").html("");
							jQuery("#FavoritosPropiedades-List--Favoritas").html("");
							jQuery("#FavoritosPropiedades-List--MisPropiedades").html("");

							var j=0;

							for(j=0; j < listPropiedades.length; j++)
							{
								var listSliderPropiedad = new Array();							
								listSliderPropiedad = listPropiedades[j][20];
							

								var valorFavorito = "";

								if(listPropiedades[j][27]==1)
									valorFavorito = "activo";

								if(j==0) {
									itemsPropiedad += "<li class='Home-ItemListPropiedad'>";
									itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
									itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad1 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedad += "<div class='u-position-absolute'>";
									itemsPropiedad += "<span class='Home-TipoPropiedad u-redondeado "+listPropiedades[j][21]+" u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedad += "<ul>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedad += "</ul>";
									itemsPropiedad += "</div>";
									itemsPropiedad += "</a>";
									itemsPropiedad += "</li>";	
									
									listPropiedadesDescatacas = listPropiedades[j][28];
								}
								else if(j==1){
									itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
									itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
									itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad2 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedad += "<div class='u-position-absolute'>";
									itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedad += "<ul>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedad += "</ul>";
									itemsPropiedad += "</div>";
									itemsPropiedad += "</a>";
									itemsPropiedad += "</li>";
								}
								else if(j==2){
									itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
									itemsPropiedad += "<ul class='Home-ListPropiedadesInterior'>";

									itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
									itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
									itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedad += "<div class='u-position-absolute'>";
									itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedad += "<ul>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedad += "</ul>";
									itemsPropiedad += "</div>";
									itemsPropiedad += "</a>";
									itemsPropiedad += "</li>";
								}
								else if(j==3){
									itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
									itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
									itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedad += "<div class='u-position-absolute'>";
									itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedad += "<ul>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedad += "</ul>";
									itemsPropiedad += "</div>";
									itemsPropiedad += "</a>";
									itemsPropiedad += "</li>";

									itemsPropiedad += "</ul>";
									itemsPropiedad += "</li>";
								}
								else if(j>3){
									itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
									itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
									itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedad += "<div class='u-position-absolute'>";
									itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedad += "<ul>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedad += "</ul>";
									itemsPropiedad += "</div>";
									itemsPropiedad += "</a>";
									itemsPropiedad += "</li>";	
								}

								itemsPropiedadLista += "<li class='FavoritosPropiedades-ItemList'>";
								itemsPropiedadLista += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedadLista += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedadLista += "<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
								itemsPropiedadLista += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedadLista += "<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedadLista += "<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedadLista += "<ul class='u-floatRight'>";
								itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedadLista += "</ul>";
								itemsPropiedadLista += "</div>";
								itemsPropiedadLista += "</a>";
								itemsPropiedadLista += "</li>";


								if(listPropiedades[j][30]==1){
									itemsMiPropiedad += "<li class='FavoritosPropiedades-ItemList'>";
									itemsMiPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsMiPropiedad += "<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
									itemsMiPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsMiPropiedad += "<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsMiPropiedad += "<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
									itemsMiPropiedad += "<ul class='u-floatRight'>";
									itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsMiPropiedad += "</ul>";
									itemsMiPropiedad += "</div>";
									itemsMiPropiedad += "</a>";
									itemsMiPropiedad += "</li>";
								}
								
								
								/*var marcadores = [
									['Casa semiamueblada', 17.990343, -92.937416,"propiedad1.jpg","Renta","$8,500","3","4","2","220 m2"],
									['Casa en Fracc. Pomoca', 17.9897837, -92.9351805,"propiedad1.jpg","Venta","$1,200,000","3","4","2","160 m2"],
									['Casa en Fracc. Palmira', 17.9895333, -92.9338302,"propiedad1.jpg","Venta","$3,360,000","3","4	","2","220 m2"]
								];*/
								
								marcadores[j] = new Array();

								//alert(listPropiedades[j][9]);

								marcadores[j][0] = listPropiedades[j][1]+"";	
								marcadores[j][1] = listPropiedades[j][8];
								marcadores[j][2] = listPropiedades[j][9];
								marcadores[j][3] = urlBasePropiedad+listSliderPropiedad[0][1]+"";
								marcadores[j][4] = listPropiedades[j][21]+"";
								marcadores[j][5] = "$"+listPropiedades[j][3];
								marcadores[j][6] = listPropiedades[j][12]+"";
								marcadores[j][7] = listPropiedades[j][13]+"";
								marcadores[j][8] = listPropiedades[j][4]+" m2";



								
								listasPosicionesFavoritas[j] = punteroFavorito;


								if(listPropiedades[j][27]==1){
									itemsPropiedadFavorita +="<li class='FavoritosPropiedades-ItemList'>";
									itemsPropiedadFavorita +="<span onclick='quitarFavorito("+j+","+punteroFavorito+","+listPropiedades[j][0]+","+datosUsuario[0]+");' class='FavoritosPropiedades-QuitarFavorito u-position-absolute'>x</span>";
									itemsPropiedadFavorita +="<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
									itemsPropiedadFavorita +="<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
									itemsPropiedadFavorita +="<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
									itemsPropiedadFavorita +="<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
									itemsPropiedadFavorita +="<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
									itemsPropiedadFavorita +="<ul class='u-floatRight'>";
									itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
									itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
									itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
									itemsPropiedadFavorita +="</ul>";
									itemsPropiedadFavorita +="</div>";
									itemsPropiedadFavorita +="</a>";
									itemsPropiedadFavorita +="</li>";

									punteroFavorito++;
								}
							}

							if(j==3)
							{
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</li>";
							}

							jQuery("#Home-ListPropiedades--Propiedades").html(itemsPropiedad);
							jQuery("#FavoritosPropiedades-List--Lista").html(itemsPropiedadLista);
							jQuery("#FavoritosPropiedades-List--Favoritas").html(itemsPropiedadFavorita);
							jQuery("#FavoritosPropiedades-List--MisPropiedades").html(itemsMiPropiedad);

									
							
							document.location.href = "#MosaicoPropiedades";
							jQuery("#FiltrosPropiedades-Msj").css({"display": "none"});
						}
					});
				});




				jQuery("#ConcluirVenta-BtnGuardar").click(function()
				{					
					if(validar_campo("#txtFechaTerminacionVenta",3,"Fecha terminación"))
						if(validar_campo("#txtPrecioTerminacionVenta",1,"Precio final"))
							if(validar_campoSelect("#stOperacionTerminacionVenta",".SolicitarCita-Form .fancy-select",0,0,"0"))
							{			
								jQuery("#ConcluirVenta-MsjGuardar").css({"display": "block"});
								jQuery("#ConcluirVenta-MsjGuardar").html("<img src='images/loading.gif' width='50px' />");		
						
								jQuery.ajax(
								{
									url		: "http://villahermosa.ampiserver.net/ajax/guardarTerminacionVentaApp.php",
									type	: "POST",
									data	: 
									{
										id_asociado								: datosUsuario[3],
										id_propiedad							: jQuery("#hdIdPropiedadVenta").val(),
										txtPrecioTerminacionVenta				: jQuery("#txtPrecioTerminacionVenta").val(),											
										stOperacionTerminacionVenta				: jQuery("#stOperacionTerminacionVenta").val(),
										stFormaPagoTerminacionVenta				: jQuery("#stFormaPagoTerminacionVenta").val(),
										txtFechaTerminacionVenta				: jQuery("#txtFechaTerminacionVenta").val()
									},
									success	: function(HTMLRespuesta)
									{			
										var respuesta = parseInt(HTMLRespuesta);	
																		
										jQuery("#txtFechaTerminacionVenta").val("Fecha terminación");
										jQuery("#txtPrecioTerminacionVenta").val("Precio final");
																														
										if(respuesta == 0)
											jQuery("#ConcluirVenta-MsjGuardar").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> No se ha podido realizar la operación.");
										else if(respuesta == 1){
											jQuery("#ConcluirVenta-MsjGuardar").html("<strong class='u-mayuscula u-inline-block'>Infome:</strong><br /> La venta de propiedad fue concluida.");
															
											setTimeout(function(){
												jQuery("#ConcluirVenta-MsjGuardar").css({"display": "none"});
												jQuery("#ConcluirVenta .PostNoticia-Regresar").click();

												setTimeout(function(){
													jQuery("#DetallePropiedades .PostNoticia-Regresar").click();
												},1000);
												

												cargarPropiedades();
											},3000);
										}
									}
								});	
							}
				});


				//Paga renovacion
				jQuery("#RenovacionMembresia-Btn").click(function()
				{
					if(validar_campoEspecial("#flVoucherPagoRenovacion",".PagoEvento-BtnAdjuntar",2,2, ""))
					{
						jQuery("#RenovacionMembresia-Msj").css({"display": "block"});
						jQuery("#RenovacionMembresia-Msj").html("<img src='images/loading.gif' width='50px' />");

						jQuery("#flVoucherPagoRenovacion").upload('http://villahermosa.ampiserver.net/ajax/guardar_renovacionMembresiaApp.php',
						{			
							id_tipo_membresia	: jQuery("#stTipoMembresiaRenovar").val(),
							id_asociado			: datosUsuario[3]
						},
						function(respuesta) 
						{
							var r = parseInt(respuesta);
							
							if(r==1){
								jQuery("#RenovacionMembresia-Msj").html("<strong class='u-mayuscula u-inline-block'>Muchas Gracias.</strong><br /> Su renovación ha sido realizada.");
								
							}
							else if(r<1)
								jQuery("#RenovacionMembresia-Msj").html("<strong class='u-mayuscula u-inline-block'>Lo sentimos.</strong><br /> Su renovación no ha sido realizada.");
							

							jQuery("#flVoucherPagoRenovacion").val("");

							setTimeout(function(){
								jQuery("#RenovacionMembresia-Msj").css({"display": "none"});
								jQuery("#RenovacionMembresia .PostNoticia-Regresar").click();
							},3000);
						});
					}
				});

				jQuery("#stTipoMembresiaRenovar").change(function(){
					if(jQuery(this).val()==1)
						jQuery("#CostoRenovacion").html("<strong>Costo de membresía:</strong> $"+listCostosMembresias[jQuery(this).val()-1][1]);
					else
						jQuery("#CostoRenovacion").html("<strong>Costo de membresía:</strong> $"+listCostosMembresias[jQuery(this).val()-1][1]);
				});


				jQuery('#stMunicipiosNP').change(function(){

					jQuery('#stLocalidadNP').empty();
					jQuery('#stLocalidadNP').append(jQuery('<option>').attr('value','0').html('Localidad'));
					jQuery('#stLocalidadNP').fancySelect();
					jQuery('#stLocalidadNP').trigger('update');

					if(jQuery('#stMunicipiosNP').val()>0){
						
						jQuery.ajax({
							data: {
								"stMunicipio" : jQuery('#stMunicipiosNP').val(),
							},
							type: "POST",
							dataType : "json",
							url: "http://villahermosa.ampiserver.net/ajax/consultarLocalidadPorMunicipiosApp.php",
							success: function( data ) {

								if(data){									
									for(var j=0; j < data.length; j++)
										jQuery('#stLocalidadNP').append("<option value='"+data[j][0]+"'>"+data[j][1]+"</option>");

									jQuery('#stLocalidadNP').append(jQuery('<option>').attr('value','999999').html('Otro'));
									jQuery('#stLocalidadNP').fancySelect();
									jQuery('#stLocalidadNP').trigger('update');
								}
							}
						});
					}
				});

				jQuery('#stMunicipiosFP').change(function(){

					jQuery('#stLocalidadFP').empty();
					jQuery('#stLocalidadFP').append(jQuery('<option>').attr('value','0').html('Localidad'));
					jQuery('#stLocalidadFP').fancySelect();
					jQuery('#stLocalidadFP').trigger('update');

					if(jQuery('#stMunicipiosFP').val()>0){
						
						jQuery.ajax({
							data: {
								"stMunicipio" : jQuery('#stMunicipiosFP').val(),
							},
							type: "POST",
							dataType : "json",
							url: "http://villahermosa.ampiserver.net/ajax/consultarLocalidadPorMunicipiosApp.php",
							success: function( data ) {

								if(data){									
									for(var j=0; j < data.length; j++)
										jQuery('#stLocalidadFP').append("<option value='"+data[j][0]+"'>"+data[j][1]+"</option>");

									jQuery('#stLocalidadFP').fancySelect();
									jQuery('#stLocalidadFP').trigger('update');
								}
							}
						});
					}
				});
  		    });
			
			//Cerrar Ventana Modal
			jQuery(document).keyup(function(event)
			{
				if(event.which==27)
				{
					jQuery(".Ampi").fadeOut("slow");
					jQuery("section").removeClass("u-blur");
				}
			});

			//Validar inmobiliaria
			function validarInmobiliaria(){
				if(jQuery("#cbIndependiente").is(':checked'))
					return true;
				else
					return validar_campoSelect("#stInmobiliaria",".CompletaTuRegistro-Center .fancy-select",1,0,"0");
			}
			
			//Funciones para activar slider
			function activarSlider1()
			{
				setTimeout(function()
				{			
					slider1 = jQuery('#bxslider1').bxSlider({pager:false, auto: true, pause:2000});

					//activar_mapaDetallePropiedad();
				},1000);
			}
			
			function activarSlider2()
			{
				setTimeout(function()
				{			
					slider2 = jQuery('#bxslider2').bxSlider({pager:false, auto: true, pause:2000});
				},1000);
			}
			
			/*function activarSlider3()
			{
				setTimeout(function()
				{			
					slider3 = jQuery('#bxslider3').bxSlider({pager:false, auto: true, pause:2000});
				},1000);
			}
			*/
			
			//Funciones para desactivar slider
			function desactivarSlider1()
			{
				setTimeout(function()
				{
					slider1.destroySlider();
				},1000);
			}
			
			function desactivarSlider2()
			{
				setTimeout(function()
				{
					slider2.destroySlider();
				},1000);
			}
			
			/*function desactivarSlider3()
			{
				setTimeout(function()
				{
					slider3.destroySlider();
				},1000);
			}
			
			function activarMapaSitios()
			{
				setTimeout(function()
				{
					jQuery(".SitiosIntere-Map").attr("src","https://www.google.com/maps/d/embed?mid=1xn-Fyes49XWixZNM-aTQgRVOFeI&ll=17.992294745557537%2C-92.94428252170343&z=14");
				},1000);
			}
			
			function desactivarMapaSitios()
			{
				jQuery(".SitiosIntere-Map").attr("src","");
			}*/

			//Municipio Edicion
			function municipiosEdicion(id_municipio,id_localidad){

				jQuery('#stLocalidadEP').empty();
				jQuery('#stLocalidadEP').append(jQuery('<option>').attr('value','0').html('Localidad'));
				jQuery('#stLocalidadEP').fancySelect();
				jQuery('#stLocalidadEP').trigger('update');

				if(id_municipio>0){
					
					jQuery.ajax({
						data: {
							"stMunicipio" : id_municipio,
						},
						type: "POST",
						dataType : "json",
						url: "http://villahermosa.ampiserver.net/ajax/consultarLocalidadPorMunicipiosApp.php",
						success: function( data ) {

							if(data){									
								for(var j=0; j < data.length; j++){
									jQuery('#stLocalidadEP').append("<option value='"+data[j][0]+"'>"+data[j][1]+"</option>");
								}
								
								jQuery('#stLocalidadEP').append(jQuery('<option>').attr('value','999999').html('Otro'));
								jQuery('#stLocalidadEP').fancySelect();

								jQuery("#stLocalidadEP option[value="+ id_localidad +"]").attr("selected",true);

								jQuery('#stLocalidadEP').trigger('update');
							}
						}
					});
				}
			}

			function activar_mapa()
			{
				var lat, lon;

				/*navigator.geolocation.getCurrentPosition(function(pos) 
                {*/
					/*
					lat = pos.coords.latitude;
					lon = pos.coords.longitude;
					*/

					lat = '17.9820662';
					lon = '-92.9374873';
					

					/*var marcadores = [
						['Casa semiamueblada', 17.990343, -92.937416,"http://villahermosa.ampiserver.net/modulos/assets/fileClient/imagenPropiedad-1-1.jpg","Renta","$8,500","3","4","220 m2"],
						['Casa en Fracc. Pomoca', 17.878888, -93.071744,"http://villahermosa.ampiserver.net/modulos/assets/fileClient/imagenPropiedad-2-1.jpg","Venta","$1,200,000","3","4","160 m2"],
						['Casa en Fracc. Palmira', 18.008186, -92.951359,"http://villahermosa.ampiserver.net/modulos/assets/fileClient/imagenPropiedad-3-1.jpg","Venta","$3,360,000","3","4","220 m2"]
					];*/

					//alert(marcadores[1][0]+"<->"+marcadores[1][1]+"<->"+marcadores[1][2]+"<->"+marcadores[1][3]+"<->"+marcadores[1][4]+"<->"+marcadores[1][5]+"<->"+marcadores[1][6]+"<->"+marcadores[1][7]+"<->"+marcadores[1][8]);

					//alert(marcadores[2][0]+"<->"+marcadores[2][1]+"<->"+marcadores[2][2]+"<->"+marcadores[2][3]+"<->"+marcadores[2][4]+"<->"+marcadores[2][5]+"<->"+marcadores[2][6]+"<->"+marcadores[2][7]+"<->"+marcadores[2][8]);
					//alert(marcadores.length);

					var latlngP = new google.maps.LatLng(lat,lon);
					var options = { zoom: 15, center: latlngP, disableDefaultUI: true,scrollwheel: false, mapTypeId: google.maps.MapTypeId.ROADMAP};
					var map = new google.maps.Map(document.getElementById('MapaPropiedad-Container'), options);
					
					var infowindow = new google.maps.InfoWindow({maxWidth: 148});
					var marker, i;
					for (i = 0; i < marcadores.length; i++) 
					{  
						if(calculator(lat+"",lon+"",marcadores[i][1]+"",marcadores[i][2]+"")<30.60)
						{
							marker = new google.maps.Marker(
							{
								position: new google.maps.LatLng(marcadores[i][1], marcadores[i][2]),
								map: map,
								icon: 'images/marker.png'
							});
		
							google.maps.event.addListener(marker, 'click', (function(marker, i) 
							{
								var listaOpciones ="<ul class='MapaPropiedad-ListInfoPropiedad'><li class='u-inline-block'><span class='icon-icoBanio'></span>"+marcadores[i][6]+"</li>"+
								"<li class='u-inline-block'><span class='icon-icoCama'></span>"+marcadores[i][7]+"</li>"+
								"<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+marcadores[i][8]+"</li>"+
								"</ul>";
								return function() 
								{
								  infowindow.setContent("<div class='MapaPropiedad-Info' style='background-image: url("+marcadores[i][3]+")'><span class='Home-TipoPropiedad "+marcadores[i][4]+" u-redondeado'>"+marcadores[i][4]+"</span> <h3>"+marcadores[i][0]+"</h3> <p>"+marcadores[i][5]+"</p>"+listaOpciones+"</div>");
								  infowindow.open(map, marker);
								}
							})(marker, i));
		
							google.maps.event.addListener(infowindow, 'domready', function() 
							{
								// Reference to the DIV that wraps the bottom of infowindow
								var iwOuter = jQuery('.gm-style-iw');
								
								/* Since this div is in a position prior to .gm-div style-iw.
								 * We use jQuery and create a iwBackground variable,
								 * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
								*/
								var iwBackground = iwOuter.prev();
							
								// Removes background shadow DIV
								iwBackground.children(':nth-child(2)').css({'display' : 'none'});
								
								// Removes background shadow DIV
								iwBackground.children(':nth-child(2)').css({'display' : 'none'});
								
								// Removes white background DIV
								iwBackground.children(':nth-child(4)').css({'display' : 'none'});
								
								// Moves the infowindow 115px to the right.
								//iwOuter.parent().parent().css({left: '115px'});
								
								// Moves the shadow of the arrow 76px to the left margin.
								iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
								
								// Moves the arrow 76px to the left margin.
								iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
								
								// Changes the desired tail shadow color.
								iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(65, 117, 5, 0.6) 0px 1px 6px', 'z-index' : '1'});
								
								// Reference to the div that groups the close button elements.
								var iwCloseBtn = iwOuter.next();
								
								// Apply the desired effect to the close button
								iwCloseBtn.css({opacity: '1', right: '-12px', top: '3px', border: '2px solid #417505', 'border-radius': '13px', 'box-shadow': '0 0 5px #417505'});
								
								// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
								if(jQuery('.iw-content').height() < 140){
									jQuery('.iw-bottom-gradient').css({display: 'none'});
								}
								
								// The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
								iwCloseBtn.mouseout(function(){
									jQuery(this).css({opacity: '1'});
								});
							});
						}
						
					}
				/*},function (error) {  
					alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');  
					 } );*/
			}

			function activar_mapaDetallePropiedad(lat,long)
			{
				//Mapa
				var latlng2 = new google.maps.LatLng(lat,long);
			
				var options2 = { zoom: 17, center: latlng2, disableDefaultUI: true,scrollwheel: false, mapTypeId: google.maps.MapTypeId.ROADMAP};
				var map2 = new google.maps.Map(document.getElementById('DetallePropiedades-Mapa'), options2);	
						
				var uRHere2 = new google.maps.Marker({ position: latlng2, map: map2, icon: 'images/marker.png' });
			}

			function activar_mapaInterior(nombreId,lat,long)
			{
				//Mapa
				var latlng2 = new google.maps.LatLng(lat,long);
			
				var options2 = { zoom: 17, center: latlng2, disableDefaultUI: true,scrollwheel: false, mapTypeId: google.maps.MapTypeId.ROADMAP};
				var map2 = new google.maps.Map(document.getElementById(nombreId), options2);	
						
				var uRHere2 = new google.maps.Marker({ position: latlng2, map: map2, icon: 'images/marker.png' });
			}

			//Editar propiedad
			function activarMapaEditarPropiedad(lat,long)
			{
				jQuery("#map_canvasE").googleMap();
				jQuery("#map_canvasE").addMarker({
						coords: [lat, long], // GPS coords
						draggable: true,
						zoom: 17,
					success: function(e) {
						jQuery("#hdLatEP").val(e.lat);
						jQuery("#hdLongEP").val(e.lon);
					}					
				});
			}

			/*function activar_mapaCapacitacion(lat,long)
			{
				//Mapa
				var latlng2 = new google.maps.LatLng(lat,long);
			
				var options2 = { zoom: 17, center: latlng2, disableDefaultUI: true,scrollwheel: false, mapTypeId: google.maps.MapTypeId.ROADMAP};
				var map2 = new google.maps.Map(document.getElementById('DetallePropiedades-MapaCapacitacion'), options2);	
						
				var uRHere2 = new google.maps.Marker({ position: latlng2, map: map2, icon: 'images/marker.png' });
			}*/

			function notificar(id_elemento,tipo){

				jQuery.ajax(
					{
						//url		: "http://localhost/adminAMPIVillahermosa/ajax/agregarNotificacionApp.php",
						url		: "http://villahermosa.ampiserver.net/ajax/agregarNotificacionApp.php",
						type	: "POST",
						data	: 
						{
							id_asociado			: datosUsuario[3],
							id_elemento			: id_elemento,											
							tipo				: tipo,
						},
						success	: function(HTMLRespuesta)
						{			
							var respuesta = parseInt(HTMLRespuesta);	
											
							
											
							/*if(respuesta == -1)
								jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> EL usuario ya esta registrado.");
							else if(respuesta == 0)
								jQuery(".Login-Msj").html("<strong class='u-mayuscula u-inline-block'>¡Lo sentimos!</strong><br /> El usuario no pudo ser registrado.");
							else if(respuesta > 0){
								document.location.href = "#Home";
								jQuery(".Login-Msj").css({"display": "none"});
							}*/
								
						}
					});
			}

			function cargarAsociados() 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/listaAsociadosApp.php",
					url: "http://villahermosa.ampiserver.net/ajax/listaAsociadosApp.php",						
					data	: {id_usuario : datosUsuario[0]},
					type	: "POST",
					dataType : "json",
					//dataType : "html",
					async    : 	false,
					success	: function(Respuesta)
					{
						//jQuery(".Login-TxtOlvidaste").html(Respuesta);
						listAsociados = Respuesta;

						//alert(listAsociados.length+"---");
					}		
				});		
			}


			
			function cargarPropiedades() 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/propiedades.php",
					url: "http://villahermosa.ampiserver.net/ajax/propiedades.php",						
					data	: { id_usuario : datosUsuario[0]},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						listPropiedades = Respuesta;	
							
						var itemsPropiedad = "";
						var itemsPropiedadLista = "";
						var itemsPropiedadFavorita = "";
						var itemsMiPropiedad = "";

						jQuery("#Home-ListPropiedades--Propiedades").html("");
						jQuery("#FavoritosPropiedades-List--Lista").html("");
						jQuery("#FavoritosPropiedades-List--Favoritas").html("");
						jQuery("#FavoritosPropiedades-List--MisPropiedades").html("");

						var j=0;

						for(j=0; j < listPropiedades.length; j++)
						{
							var listSliderPropiedad = new Array();							
							listSliderPropiedad = listPropiedades[j][20];

							var valorFavorito = "";

							if(listPropiedades[j][27]==1)
								valorFavorito = "activo";

							if(j==0) {
								itemsPropiedad += "<li class='Home-ItemListPropiedad'>";
								itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad1 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedad += "<div class='u-position-absolute'>";
								itemsPropiedad += "<span class='Home-TipoPropiedad u-redondeado "+listPropiedades[j][21]+" u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedad += "<ul>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</div>";
								itemsPropiedad += "</a>";
								itemsPropiedad += "</li>";	
								
								listPropiedadesDescatacas = listPropiedades[j][28];
							}
							else if(j==1){
								itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
								itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad2 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedad += "<div class='u-position-absolute'>";
								itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedad += "<ul>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</div>";
								itemsPropiedad += "</a>";
								itemsPropiedad += "</li>";
							}
							else if(j==2){
								itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
								itemsPropiedad += "<ul class='Home-ListPropiedadesInterior'>";

								itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
								itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedad += "<div class='u-position-absolute'>";
								itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedad += "<ul>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</div>";
								itemsPropiedad += "</a>";
								itemsPropiedad += "</li>";
							}
							else if(j==3){
								itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
								itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedad += "<div class='u-position-absolute'>";
								itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedad += "<ul>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</div>";
								itemsPropiedad += "</a>";
								itemsPropiedad += "</li>";

								itemsPropiedad += "</ul>";
								itemsPropiedad += "</li>";
							}
							else if(j>3){
								itemsPropiedad += "<li class='Home-ItemListPropiedad u-inline-block'>";
								itemsPropiedad += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
								itemsPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedad += "<div class='u-position-absolute'>";
								itemsPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedad += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedad += "<p>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedad += "<ul>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedad += "</ul>";
								itemsPropiedad += "</div>";
								itemsPropiedad += "</a>";
								itemsPropiedad += "</li>";	
							}

							itemsPropiedadLista += "<li class='FavoritosPropiedades-ItemList'>";
							itemsPropiedadLista += "<span data-posicion='"+j+"' data-posicionfavorita='"+punteroFavorito+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
							itemsPropiedadLista += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
							itemsPropiedadLista += "<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
							itemsPropiedadLista += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
							itemsPropiedadLista += "<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
							itemsPropiedadLista += "<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
							itemsPropiedadLista += "<ul class='u-floatRight'>";
							itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
							itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
							itemsPropiedadLista += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
							itemsPropiedadLista += "</ul>";
							itemsPropiedadLista += "</div>";
							itemsPropiedadLista += "</a>";
							itemsPropiedadLista += "</li>";


							if(listPropiedades[j][30]==1){
								itemsMiPropiedad += "<li class='FavoritosPropiedades-ItemList'>";
								itemsMiPropiedad += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsMiPropiedad += "<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
								itemsMiPropiedad += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsMiPropiedad += "<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsMiPropiedad += "<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
								itemsMiPropiedad += "<ul class='u-floatRight'>";
								itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsMiPropiedad += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsMiPropiedad += "</ul>";
								itemsMiPropiedad += "</div>";
								itemsMiPropiedad += "</a>";
								itemsMiPropiedad += "</li>";
							}
							
							
							/*var marcadores = [
								['Casa semiamueblada', 17.990343, -92.937416,"propiedad1.jpg","Renta","$8,500","3","4","2","220 m2"],
								['Casa en Fracc. Pomoca', 17.9897837, -92.9351805,"propiedad1.jpg","Venta","$1,200,000","3","4","2","160 m2"],
								['Casa en Fracc. Palmira', 17.9895333, -92.9338302,"propiedad1.jpg","Venta","$3,360,000","3","4	","2","220 m2"]
							];*/
							
							marcadores[j] = new Array();

							//alert(listPropiedades[j][9]);

							marcadores[j][0] = listPropiedades[j][1]+"";	
							marcadores[j][1] = listPropiedades[j][8];
							marcadores[j][2] = listPropiedades[j][9];
							marcadores[j][3] = urlBasePropiedad+listSliderPropiedad[0][1]+"";
							marcadores[j][4] = listPropiedades[j][21]+"";
							marcadores[j][5] = "$"+listPropiedades[j][3];
							marcadores[j][6] = listPropiedades[j][12]+"";
							marcadores[j][7] = listPropiedades[j][13]+"";
							marcadores[j][8] = listPropiedades[j][4]+" m2";



							
							listasPosicionesFavoritas[j] = punteroFavorito;


							if(listPropiedades[j][27]==1){
								itemsPropiedadFavorita +="<li class='FavoritosPropiedades-ItemList'>";
								itemsPropiedadFavorita +="<span onclick='quitarFavorito("+j+","+punteroFavorito+","+listPropiedades[j][0]+","+datosUsuario[0]+");' class='FavoritosPropiedades-QuitarFavorito u-position-absolute'>x</span>";
								itemsPropiedadFavorita +="<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
								itemsPropiedadFavorita +="<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
								itemsPropiedadFavorita +="<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
								itemsPropiedadFavorita +="<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[j][1]+"</h4>";
								itemsPropiedadFavorita +="<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[j][3]+"</p>";
								itemsPropiedadFavorita +="<ul class='u-floatRight'>";
								itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
								itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
								itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
								itemsPropiedadFavorita +="</ul>";
								itemsPropiedadFavorita +="</div>";
								itemsPropiedadFavorita +="</a>";
								itemsPropiedadFavorita +="</li>";

								punteroFavorito++;
							}
						}

						if(j==3)
						{
							itemsPropiedad += "</ul>";
							itemsPropiedad += "</li>";
						}

						jQuery("#Home-ListPropiedades--Propiedades").html(itemsPropiedad);
						jQuery("#FavoritosPropiedades-List--Lista").html(itemsPropiedadLista);
						jQuery("#FavoritosPropiedades-List--Favoritas").html(itemsPropiedadFavorita);
						jQuery("#FavoritosPropiedades-List--MisPropiedades").html(itemsMiPropiedad);
					}		
				});		
			}



			function cargarPropiedadesDestacadas() 
			{
				var itemsPropiedadDescatada = "";
				jQuery("#Home-ListPropiedades--Destacadas").html("");

				var a=0;

				//alert(listPropiedadesDescatacas.length);
				for(a=0; a < listPropiedadesDescatacas.length; a++)
				{
					//alert(listPropiedadesDescatacas[a]);

					var j = 0;

					j =  buscarPosicionPropiedad(listPropiedadesDescatacas[a]);
					
					//alert("Yes->"+j);

					var listSliderPropiedad = new Array();							
					listSliderPropiedad = listPropiedades[j][20];
					
					//alert("Yes");

					var valorFavorito = "";

					if(listPropiedades[j][27]==1)
						valorFavorito = "activo";

					

					if(a==0) {
						itemsPropiedadDescatada += "<li class='Home-ItemListPropiedad'>";
						itemsPropiedadDescatada += "<span data-posicion='"+j+"' data-posicionfavorita='"+listasPosicionesFavoritas[j]+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
						itemsPropiedadDescatada += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad1 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
						itemsPropiedadDescatada += "<div class='u-position-absolute'>";
						itemsPropiedadDescatada += "<span class='Home-TipoPropiedad u-redondeado "+listPropiedades[j][21]+" u-inline-block'>"+listPropiedades[j][21]+"</span>";
						itemsPropiedadDescatada += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
						itemsPropiedadDescatada += "<p>$"+listPropiedades[j][3]+"</p>";
						itemsPropiedadDescatada += "<ul>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
						itemsPropiedadDescatada += "</ul>";
						itemsPropiedadDescatada += "</div>";
						itemsPropiedadDescatada += "</a>";
						itemsPropiedadDescatada += "</li>";				
					}
					else if(a==1){
						itemsPropiedadDescatada += "<li class='Home-ItemListPropiedad u-inline-block'>";
						itemsPropiedadDescatada += "<span data-posicion='"+j+"' data-posicionfavorita='"+listasPosicionesFavoritas[j]+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
						itemsPropiedadDescatada += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad2 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
						itemsPropiedadDescatada += "<div class='u-position-absolute'>";
						itemsPropiedadDescatada += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
						itemsPropiedadDescatada += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
						itemsPropiedadDescatada += "<p>$"+listPropiedades[j][3]+"</p>";
						itemsPropiedadDescatada += "<ul>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
						itemsPropiedadDescatada += "</ul>";
						itemsPropiedadDescatada += "</div>";
						itemsPropiedadDescatada += "</a>";
						itemsPropiedadDescatada += "</li>";
					}
					else if(a==2){
						itemsPropiedadDescatada += "<li class='Home-ItemListPropiedad u-inline-block'>";
						itemsPropiedadDescatada += "<ul class='Home-ListPropiedadesInterior'>";

						itemsPropiedadDescatada += "<li class='Home-ItemListPropiedad u-inline-block'>";
						itemsPropiedadDescatada += "<span data-posicion='"+j+"' data-posicionfavorita='"+listasPosicionesFavoritas[j]+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
						itemsPropiedadDescatada += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
						itemsPropiedadDescatada += "<div class='u-position-absolute'>";
						itemsPropiedadDescatada += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
						itemsPropiedadDescatada += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
						itemsPropiedadDescatada += "<p>$"+listPropiedades[j][3]+"</p>";
						itemsPropiedadDescatada += "<ul>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
						itemsPropiedadDescatada += "</ul>";
						itemsPropiedadDescatada += "</div>";
						itemsPropiedadDescatada += "</a>";
						itemsPropiedadDescatada += "</li>";
					}
					else if(a==3){
						itemsPropiedadDescatada += "<li class='Home-ItemListPropiedad u-inline-block'>";
						itemsPropiedadDescatada += "<span data-posicion='"+j+"' data-posicionfavorita='"+listasPosicionesFavoritas[j]+"' data-propiedad='"+listPropiedades[j][0]+"' data-usuario='"+datosUsuario[0]+"' class='Home-icoFavorito icon-icoFavorito "+valorFavorito+" u-position-absolute'></span>";
						itemsPropiedadDescatada += "<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+j+");' class='Home-LinkListPropiedad3 u-inline-block' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
						itemsPropiedadDescatada += "<div class='u-position-absolute'>";
						itemsPropiedadDescatada += "<span class='Home-TipoPropiedad "+listPropiedades[j][21]+" u-redondeado u-inline-block'>"+listPropiedades[j][21]+"</span>";
						itemsPropiedadDescatada += "<h4 class='u-efecto'>"+listPropiedades[j][1]+"</h4>";
						itemsPropiedadDescatada += "<p>$"+listPropiedades[j][3]+"</p>";
						itemsPropiedadDescatada += "<ul>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[j][12]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[j][13]+"</li>";
						itemsPropiedadDescatada += "<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[j][4]+"m2.</li>";
						itemsPropiedadDescatada += "</ul>";
						itemsPropiedadDescatada += "</div>";
						itemsPropiedadDescatada += "</a>";
						itemsPropiedadDescatada += "</li>";

						itemsPropiedadDescatada += "</ul>";
						itemsPropiedadDescatada += "</li>";
					}

					listasPosicionesPropiedadesDest[a] = j;
				}

				if(a==3)
				{
					itemsPropiedadDescatada += "</ul>";
					itemsPropiedadDescatada += "</li>";
				}

				jQuery("#Home-ListPropiedades--Destacadas").html(itemsPropiedadDescatada);
							
			}


			//Buscar posicion de asociciado
			function buscarPosicionAsociado(id_a){
				//alert(listAsociados.length);
				for(var j=0; j < listAsociados.length; j++)
					if(listAsociados[j][0]==id_a)
						return j;
			}

			//Buscar posicion de propiedad
			function buscarPosicionPropiedad(id_p){

				//alert(listPropiedades.length);

				for(var j=0; j < listPropiedades.length; j++)
					if(listPropiedades[j][0]==id_p)
						return j;
			}


			//Buscar posicion de propiedad
			function buscarPosicionPropiedadDestacada(pos){
				for(var j=0; j < listasPosicionesPropiedadesDest.length; j++)
					if(listasPosicionesPropiedadesDest[j]==pos)
						return j;
				
				return -1;
			}

			//Buscar posicion de evento
			function buscarPosicionEvento(id_e){
				//alert(listAsociados.length);
				for(var j=0; j < listEventos.length; j++)
					if(listEventos[j][0]==id_e)
						return j;
			}

			//Buscar posicion de capacitacion
			function buscarPosicionCapacitacion(id_c){

				for(var j=0; j < listCapacitaciones.length; j++)
					if(listCapacitaciones[j][0]==id_c)
						return j;
			}

			//Buscar posicion de entrada
			function buscarPosicionEntrada(id_e){

				for(var j=0; j < listEntradas.length; j++)
					if(listEntradas[j][0]==id_e)
						return j;
			}

			//Buscar posicion de agenda
			function buscarPosicionAgenda(id_a){

				for(var j=0; j < listAgendaG.length; j++)
					if(listAgendaG[j][0]==id_a)
						return j;
			}

			//Buscar posicion de mensaje
			function buscarPosicionMensaje(id_m){

				for(var j=0; j < listMensajeG.length; j++)
					if(listMensajeG[j][0]==id_m)
						return j;
			}


			function cargarNoticias(id_u) 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/listaDeEntradasApp.php",
					url: "http://villahermosa.ampiserver.net/ajax/listaDeEntradasApp.php",						
					data	:{id_usuario : id_u},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						listEntradas = Respuesta;	
							
						var itemsList = "";
						var pB = 0;
						var itemsListGaleria = "";
						var pG = 0;

		
						jQuery("#BoletinesNoticias-ListBoletines").html("");
						jQuery("#BoletinesNoticias-ListGalerias").html("");


						for(var j=0; j < listEntradas.length; j++)
						{
							if(listEntradas[j][5]==1)
							{
								if(pB==0) {
									itemsList += "<li class='BoletinesNoticias-ItemList'>";
									itemsList += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='slide' class='BoletinesNoticias-LinkList u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\")'>";
									itemsList += "<h3 class='u-efecto u-position-absolute'>"+listEntradas[j][1]+"</h3>";
									itemsList += "<span class='icon-icoBoletin u-inline-block u-position-absolute'></span>";
									itemsList += "</a>";
									itemsList += "</li>";
								}
								else if(pB==1){
									itemsList += "<li class='BoletinesNoticias-ItemList u-inline-block'>";
									itemsList += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='slide' class='BoletinesNoticias-LinkList2 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";							
									itemsList += "<h3 class='u-efecto u-position-absolute'>";
									itemsList += "<span class='icon-icoBoletin u-inline-block u-position-absolute'></span>";
									itemsList += ""+listEntradas[j][1]+"";
									itemsList += "</h3>";					
									itemsList += "</a>";
									itemsList += "</li>";
								}
								else if(pB==2){
									itemsList += "<li class='BoletinesNoticias-ItemList u-inline-block'>";
									itemsList += "<ul class='BoletinesNoticias-ListInterior'>";
	
									itemsList += "<li class='BoletinesNoticias-ItemList'>";
									itemsList += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='slide' class='BoletinesNoticias-LinkList3 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";
									itemsList += "<h3 class='u-efecto u-position-absolute'>";
									itemsList += "<span class='icon-icoBoletin u-inline-block u-position-absolute'></span>";
									itemsList += ""+listEntradas[j][1]+"";
									itemsList += "</h3>";
									itemsList += "</a>";
									itemsList += "</li>";
								}
	
								else if(pB==3){
									itemsList += "<li class='BoletinesNoticias-ItemList'>";
									itemsList += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='slide' class='BoletinesNoticias-LinkList3 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";
									itemsList += "<h3 class='u-efecto u-position-absolute'>";
									itemsList += "<span class='icon-icoBoletin u-inline-block u-position-absolute'></span>";
									itemsList += ""+listEntradas[j][1]+"";
									itemsList += "</h3>";
									itemsList += "</a>";
									itemsList += "</li>";
									
									
									itemsList += "</ul>";
									itemsList += "</li>";
								}
								
								else if(pB>3){
									itemsList += "<li class='BoletinesNoticias-ItemList'>";
									itemsList += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='slide' class='BoletinesNoticias-LinkList4 u-inline-block'>";
									itemsList += "<figure class='BoletinesNoticias-ImgLink u-inline-block'>";
									itemsList += "<img src='"+urlBaseEntrada+listEntradas[j][3]+"' alt='Boletin' />";
									itemsList += "</figure>";
									itemsList += "<div class='BoletinesNoticias-Info u-inline-block'>";
									itemsList += "<h3>"+listEntradas[j][1]+"</h3>";
									itemsList += "<span class='icon-icoBoletin u-inline-block u-position-absolute'></span>";
									itemsList += "</div>";
									itemsList += "</a>";
									itemsList += "</li>";
	
								}
								pB++;
							}
							else if(listEntradas[j][5]==2)
							{
								if(pG==0) {
									itemsListGaleria += "<li class='GaleriasNoticias-ItemList'>";
									itemsListGaleria += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='slide' class='GaleriasNoticias-LinkList u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\")'>";
									itemsListGaleria += "<div class='u-position-absolute'>";
									itemsListGaleria += "<time class='u-block'>"+listEntradas[j][4]+"</time>";
									itemsListGaleria += "<h3 class='u-efecto'>";
									itemsListGaleria += ""+listEntradas[j][1]+"";
									itemsListGaleria += "</h3>";
									itemsListGaleria += "</div>";									
									itemsListGaleria += "</a>";
									itemsListGaleria += "</li>";
								}
								else if(pG==1) {
									itemsListGaleria += "<li class='GaleriasNoticias-ItemList u-inline-block'>";
									itemsListGaleria += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='slide' class='GaleriasNoticias-LinkList2 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";						
									itemsListGaleria += "<div class='u-position-absolute'>";
									itemsListGaleria += "<time class='u-block'>"+listEntradas[j][4]+"</time>";
									itemsListGaleria += "<h3 class='u-efecto'>";
									itemsListGaleria += ""+listEntradas[j][1]+"";
									itemsListGaleria += "</h3>";
									itemsListGaleria += "</div>";										
									itemsListGaleria += "</a>";
									itemsListGaleria += "</li>";
								}
								else if(pG==2) {
									itemsListGaleria += "<li class='GaleriasNoticias-ItemList u-inline-block'>";
									itemsListGaleria += "<ul class='BoletinesNoticias-ListInterior'>";

									itemsListGaleria += "<li>";
									itemsListGaleria += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='slide' class='GaleriasNoticias-LinkList3 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";
									itemsListGaleria += "<div class='u-position-absolute'>";
									itemsListGaleria += "<time class='u-block'>"+listEntradas[j][4]+"</time>";
									itemsListGaleria += "<h3 class='u-efecto'>";
									itemsListGaleria += ""+listEntradas[j][1]+"";
									itemsListGaleria += "</h3>";
									itemsListGaleria += "</div>";										
									itemsListGaleria += "</a>";
									itemsListGaleria += "</li>";

								}
								else if(pG==3) {
									itemsListGaleria += "<li>";
									itemsListGaleria += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='slide' class='GaleriasNoticias-LinkList3 u-inline-block u-redondeado--04' style='background-image: url(\""+urlBaseEntrada+listEntradas[j][3]+"\");'>";
									itemsListGaleria += "<div class='u-position-absolute'>";
									itemsListGaleria += "<time class='u-block'>"+listEntradas[j][4]+"</time>";
									itemsListGaleria += "<h3 class='u-efecto'>";
									itemsListGaleria += ""+listEntradas[j][1]+"";
									itemsListGaleria += "</h3>";
									itemsListGaleria += "</div>";										
									itemsListGaleria += "</a>";
									itemsListGaleria += "</li>";

									itemsListGaleria += "</ul>";
									itemsListGaleria += "</li>";
								}
								else if(pG>3){
									itemsListGaleria += "<li class='GaleriasNoticias-ItemList'>";
									itemsListGaleria += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='slide' class='GaleriasNoticias-LinkList4 u-inline-block'>";
									itemsListGaleria += "<figure class='GaleriasNoticias-ImgLink u-inline-block'>";
									itemsListGaleria += "<img src='"+urlBaseEntrada+listEntradas[j][3]+"' alt='Galeria' />";
									itemsListGaleria += "</figure>";
									itemsListGaleria += "<div class='GaleriasNoticias-Info u-inline-block'>";
									itemsListGaleria += "<div>";
									itemsListGaleria += "<time class='u-block'>"+listEntradas[j][4]+"</time>";
									itemsListGaleria += "<h3>"+listEntradas[j][1]+"</h3>";
									itemsListGaleria += "</div>";									
									itemsListGaleria += "</div>";
									itemsListGaleria += "</a>";
									itemsListGaleria += "</li>";
								}


								pG++;
							}

							if(pB==3)
							{
								itemsList += "</ul>";
								itemsList += "</li>";
							}

							if(pG==3)
							{
								itemsListGaleria += "</ul>";
								itemsListGaleria += "</li>";
							}

							jQuery(".PerFil-TotalPostItemList").eq(1).html(""+pB);
							
						}

						jQuery("#BoletinesNoticias-ListBoletines").html(itemsList);
						jQuery("#BoletinesNoticias-ListGalerias").html(itemsListGaleria);



						var itemsListHome = "";
						jQuery(".Home-ListBoletines").html("");

						//Lista de lo mas reciente Home
						for(var j=0; j < listEntradas.length; j++)
						{
							if(j<3){
								if(listEntradas[j][5]==1){
									itemsListHome += "<li class='Home-ItemListBoletin'>";
									itemsListHome += "<a onclick='datosBoletin("+j+");' href='#PostNoticia' transition='fade' class='Home-LinkListBoletin u-inline-block'>";
									itemsListHome += "<figure class='Home-ImgListBoletin u-inline-block'>";
									itemsListHome += "<img src='"+urlBaseEntrada+listEntradas[j][3]+"' alt='Boletin' />";
									itemsListHome += "</figure>";
									itemsListHome += "<div class='Home-InfoListBoletin u-inline-block'>";
									itemsListHome += "<div class='Home-CategoriasListBoletin'>";
									itemsListHome += "<span class='Home-ItemCategoriaListBoletin u-redondeado u-inline-block'>";
									itemsListHome += "Boletines";
									itemsListHome += "</span>";
									itemsListHome += "</div>";
									itemsListHome += "<h4 class='Home-TitleListBoletin u-efecto'>";
									itemsListHome += ""+listEntradas[j][1];
									itemsListHome += "</h4>";
									itemsListHome += "</div>";
									itemsListHome += "</a>";
									itemsListHome += "</li>";
								}
								else if(listEntradas[j][5]==2){
									itemsListHome += "<li class='Home-ItemListBoletin'>";
									itemsListHome += "<a href='#PostGaleria' onclick='datosGaleria("+j+");' transition='fade' class='Home-LinkListBoletin u-inline-block'>";
									itemsListHome += "<figure class='Home-ImgListBoletin u-inline-block'>";
									itemsListHome += "<img src='"+urlBaseEntrada+listEntradas[j][3]+"' alt='Boletin' />";
									itemsListHome += "</figure>";
									itemsListHome += "<div class='Home-InfoListBoletin u-inline-block'>";
									itemsListHome += "<div class='Home-CategoriasListBoletin'>";
									itemsListHome += "<span class='Home-ItemCategoriaListBoletin Galerias u-redondeado u-inline-block'>";
									itemsListHome += "Galerias";
									itemsListHome += "</span>";
									itemsListHome += "</div>";
									itemsListHome += "<h4 class='Home-TitleListBoletin u-efecto'>";
									itemsListHome += ""+listEntradas[j][1];
									itemsListHome += "</h4>";
									itemsListHome += "</div>";
									itemsListHome += "</a>";
									itemsListHome += "</li>";
								}
							}	
						}

						jQuery(".Home-ListBoletines").html(itemsListHome);
					}		
				});		
			}




			function cargarEventos() 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/eventos.php",
					url: "http://villahermosa.ampiserver.net/ajax/eventos.php",						
					data	:{id_usuario : datosUsuario[0]},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						listEventos = Respuesta;	

						//alert(listEventos.length);
							
						var itemsList = "";
						jQuery(".CursosNoticias-List--Eventos").html("");

						for(var j=0; j < listEventos.length; j++)
						{
							itemsList += "<li class='CursosNoticias-ItemList'>";
							itemsList += "<a href='#EventoNoticia' onclick='datosEvento("+j+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsList += "<time datetime='"+listEventos[j][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsList += ""+listEventos[j][20];
							itemsList += "<span class='u-block'>"+listEventos[j][19]+"</span>";
							itemsList += "</time>";
							itemsList += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsList += "<div>";
							itemsList += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsList += ""+listEventos[j][1];
							itemsList += "</h4>";
							itemsList += "<p>";
							itemsList += ""+listEventos[j][12];
							itemsList += "</p>";
							itemsList += "</div>";
							itemsList += "</div>";
							itemsList += "</a>";
							itemsList += "</li>";
						}

						jQuery(".CursosNoticias-List--Eventos").html(itemsList);
						
						jQuery(".PerFil-TotalPostItemList").eq(2).html(""+listEventos.length);					

						var itemsListHome = "";
						jQuery(".Home-ListProximosEventos").html("");

						var listEventosAux = new Array();

						listEventosAux = listEventos.slice();
						listEventosAux.reverse();

						var totalE = listEventosAux.length;
						//Lista de lo mas reciente Home
						
						var hoy = new Date();
						
						for(var j=0; j < listEventosAux.length; j++)
						{
							if(j<3){
								if(listEventosAux[j][8].substr(5,2)>=(hoy.getMonth()+1) && listEventosAux[j][20] >= hoy.getDate())
								{							
									itemsListHome += "<li class='Home-ItemListProximoEvento'>";
									itemsListHome += "<a href='#EventoNoticia' onclick='datosEvento("+(totalE-1-j)+");' class='Home-LinkListProximoEvento u-inline-block'>";
									itemsListHome += "<time datetime='"+listEventosAux[j][8]+"' class='Home-FechaListProximoEvento u-inline-block u-textCenter u-efecto'>";
									itemsListHome += ""+listEventosAux[j][20];
									itemsListHome += "<span class='u-block'>"+listEventosAux[j][19]+"</span>";
									itemsListHome += "</time>";
									itemsListHome += "<div class='Home-InfoListProximoEvento u-inline-block'>";
									itemsListHome += "<h4 class='Home-TitleListProximoEvento u-efecto'>";
									itemsListHome += ""+listEventosAux[j][1];
									itemsListHome += "</h4>";
									itemsListHome += "<p>";
									itemsListHome += ""+listEventosAux[j][12];
									itemsListHome += "</p>";
									itemsListHome += "</div>";
									itemsListHome += "</a>";
									itemsListHome += "</li>";
								}
							}							
						}
						jQuery(".Home-ListProximosEventos").html(itemsListHome);
					}		
				});		
			}





			function cargarCapacitaciones() 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/eventos.php",
					url: "http://villahermosa.ampiserver.net/ajax/capacitaciones.php",						
					data	:{id_usuario : datosUsuario[0]},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						listCapacitaciones = Respuesta;	
							
						var itemsList = "";
						jQuery(".CursosNoticias-List--Capacitaciones").html("");

						for(var j=0; j < listCapacitaciones.length; j++)
						{
							itemsList += "<li class='CursosNoticias-ItemList'>";
							itemsList += "<a href='#CursoNoticia' onclick='datosCapacitacion("+j+");' transition='slide' class='CursosNoticias-LinkList u-inline-block'>";
							itemsList += "<time datetime='"+listCapacitaciones[j][7]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Cursos u-inline-block u-textCenter u-efecto'>";
							itemsList += ""+listCapacitaciones[j][19];
							itemsList += "<span class='u-block'>"+listCapacitaciones[j][18]+"</span>";
							itemsList += "</time>";
							itemsList += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsList += "<div>";
							itemsList += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsList += ""+listCapacitaciones[j][1];
							itemsList += "</h4>";
							itemsList += "<p>";
							itemsList += ""+listCapacitaciones[j][10];
							itemsList += "</p>";
							itemsList += "</div>";
							itemsList += "</div>";
							itemsList += "</a>";
							itemsList += "</li>";
						}

						jQuery(".CursosNoticias-List--Capacitaciones").html(itemsList);					
						
					}		
				});		
			}


			function cargarPerfil(pos){				
				jQuery("#MiPerfil .MiPerfil-Foto img").attr("src",urlBaseAsociado+listAsociados[pos][7]);
				jQuery("#MiPerfil .MiPerfil-Nombre").html(listAsociados[pos][1]);
				jQuery("#MiPerfil .MiPerfil-Agente").html(listAsociados[pos][3]+" / "+listAsociados[pos][6]);
				jQuery("#MiPerfil .MiPerfil-Reputacion").html("Reputación: "+listAsociados[pos][17]);
				
				jQuery("#MiPerfil .MiPerfil-Txt").html(listAsociados[pos][4]);
				/*jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(0).html("Reputación: <strong>"+listAsociados[pos][17]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(1).html("Tipo: <strong>"+listAsociados[pos][3]+"</strong>");*/
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(0).html("Folio de asociado AMPI: <strong>"+listAsociados[pos][20]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(1).html("Licencia Inmobiliaria: <strong>"+listAsociados[pos][21]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(2).html("RFC: <strong>"+listAsociados[pos][22]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(3).html("CURP: <strong>"+listAsociados[pos][23]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(4).html("Años de experiencia: <strong>"+listAsociados[pos][24]+" año(s)</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(5).html("Edad: <strong>"+listAsociados[pos][26]+" años</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(6).html("Estado civil: <strong>"+listAsociados[pos][27]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(7).html("Dirección: <strong>"+listAsociados[pos][28]+"</strong>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(8).html("<strong>Historial comercial en el sector:</strong> <br />"+listAsociados[pos][25]+"");


				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(9).html("Teléfono: <a onclick=\"document.location.href = 'tel:+"+listAsociados[pos][8]+"';\" target='_blank'><strong>"+listAsociados[pos][8]+"</strong></a>");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(10).html("Email: <a onclick=\"document.location.href = 'mailto:"+listAsociados[pos][9]+"'\" target='_blank'><strong>"+listAsociados[pos][9]+"</strong></a>");

				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(11).html("");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(12).html("");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(13).html("");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(14).html("");
				jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(15).html("");

				if(listAsociados[pos][10]!="")
					jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(11).html("Twitter: <a onclick=\"document.location.href = '"+listAsociados[pos][10]+"'\" target='_blank'><strong>"+listAsociados[pos][10]+"</strong></a>");
				
				if(listAsociados[pos][11]!="")
					jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(12).html("Facebook: <a onclick=\"document.location.href = '"+listAsociados[pos][11]+"'\" target='_blank'><strong>"+listAsociados[pos][11]+"</strong></a>");
				
				if(listAsociados[pos][12]!="")
					jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(13).html("Instagram: <a onclick=\"document.location.href = '"+listAsociados[pos][12]+"'\" target='_blank'><strong>"+listAsociados[pos][12]+"</strong></a>");

				if(listAsociados[pos][29]!="")
					jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(14).html("Linkedin: <a onclick=\"document.location.href = '"+listAsociados[pos][29]+"'\" target='_blank'><strong>"+listAsociados[pos][29]+"</strong></a>");	

				if(listAsociados[pos][30]!="")
					jQuery("#MiPerfil .MiPerfil-ListDatos li").eq(15).html("Página web: <a onclick=\"document.location.href = '"+listAsociados[pos][30]+"'\" target='_blank'><strong>"+listAsociados[pos][30]+"</strong></a>");


				jQuery("#MiPerfil .MiPerfil-ListCertificaciones").eq(0).html("");
				jQuery("#MiPerfil .MiPerfil-ListCertificaciones").eq(1).html("");

				var itemCertificacionAsociado = "";

				if(listAsociados[pos][13]!="")
				{
					var listCertificacionesAsociados = new Array();							
					listCertificacionesAsociados = listAsociados[pos][13];

					for(var j=0; j < listCertificacionesAsociados.length; j++){
						itemCertificacionAsociado += "<li>";
						itemCertificacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
						itemCertificacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCertificacion u-inline-block u-textCenter'></span>";
						itemCertificacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
						itemCertificacionAsociado += ""+listCertificacionesAsociados[j][1];
						itemCertificacionAsociado += "</h4>";
						itemCertificacionAsociado += "</a>";
						itemCertificacionAsociado += "</li>";						
					}
				}
				
				var listCertificacionesAsociados2 = new Array();							
				listCertificacionesAsociados2 = listAsociados[pos][14];

				for(var j=0; j < listCertificacionesAsociados2.length; j++){

					itemCertificacionAsociado += "<li>";
					itemCertificacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
					itemCertificacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCertificacion u-inline-block u-textCenter'></span>";
					itemCertificacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
					itemCertificacionAsociado += ""+listCertificacionesAsociados2[j][1];
					itemCertificacionAsociado += "</h4>";
					itemCertificacionAsociado += "</a>";
					itemCertificacionAsociado += "</li>";						
				}

				jQuery("#MiPerfil .MiPerfil-ListCertificaciones").eq(0).html(itemCertificacionAsociado);
				
				var listCapacitacionesAsociados = new Array();							
				listCapacitacionesAsociados = listAsociados[pos][15];

				var itemCapacitacionAsociado = "";

				for(var j=0; j < listCapacitacionesAsociados.length; j++){

					itemCapacitacionAsociado += "<li>";
					itemCapacitacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
					itemCapacitacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCursoDiploma u-inline-block u-textCenter'></span>";
					itemCapacitacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
					itemCapacitacionAsociado += ""+listCapacitacionesAsociados[j][1];
					itemCapacitacionAsociado += "</h4>";
					itemCapacitacionAsociado += "</a>";
					itemCapacitacionAsociado += "</li>";	
				}

				
				var listCapacitacionesAsociados2 = new Array();							
				listCapacitacionesAsociados2 = listAsociados[pos][16];

				for(var j=0; j < listCapacitacionesAsociados2.length; j++){

					itemCapacitacionAsociado += "<li>";
					itemCapacitacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
					itemCapacitacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCursoDiploma u-inline-block u-textCenter'></span>";
					itemCapacitacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
					itemCapacitacionAsociado += ""+listCapacitacionesAsociados2[j][1];
					itemCapacitacionAsociado += "</h4>";
					itemCapacitacionAsociado += "</a>";
					itemCapacitacionAsociado += "</li>";						
				}
				jQuery("#MiPerfil .MiPerfil-ListCertificaciones").eq(1).html(itemCapacitacionAsociado);

				
				jQuery("#MiPerfil .MiPerfil-ListContactos").html("");
				var listContactosAsociados = new Array();							
				listContactosAsociados = listAsociados[pos][18];

				var itemContactoAsociado = "";

				for(var j=0; j < listContactosAsociados.length; j++){
					var posB =  buscarPosicionAsociado(listContactosAsociados[j]);
					//alert(posB);
					itemContactoAsociado += "<li class='u-inline-block'>";
					itemContactoAsociado += "<a transition='fade' href='#PerfilContacto'onclick='cargarPerfilMiembro("+listAsociados[posB][0]+");' class='MiPerfil-ItemListContacto u-inline-block'>";
					itemContactoAsociado += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posB][7]+"' alt='Avatar' />";
					itemContactoAsociado += "</a>";
					itemContactoAsociado += "</li>";
				}

				jQuery("#MiPerfil .MiPerfil-ListContactos").html(itemContactoAsociado);
			}

			function cargarPerfilMiembro(id_a)
			{
				datosAsoacido(id_a);

				jQuery("#MiPerfil-BtnAgregar").slideUp("slow");
			} 

			function datosAsoacido(id_a){
				var pos = buscarPosicionAsociado(id_a);

				//alert(pos+"<->"+id_a);

				jQuery(".MiPerfil-ItemListEstrellas").removeClass('activo');

				jQuery(".MiPerfil-ItemListEstrellas").data("idA",listAsociados[pos][0]);
				jQuery(".MiPerfil-ItemListEstrellas").data("idU",datosUsuario[0]);

				var calificacionA = listAsociados[pos][19];

				var totalCA = calificacionA /2 ;

				for(var j=0; j<totalCA; j++)
					jQuery(".MiPerfil-ItemListEstrellas").eq(j).addClass('activo');
		
					jQuery("#PerfilContacto .MiPerfil-Foto img").attr("src",urlBaseAsociado+listAsociados[pos][7]);
					jQuery("#PerfilContacto .MiPerfil-Nombre").html(listAsociados[pos][1]);
					jQuery("#PerfilContacto .MiPerfil-Agente").html(listAsociados[pos][3]+" / "+listAsociados[pos][6]);
					jQuery("#PerfilContacto .MiPerfil-Reputacion").html("Reputación: "+listAsociados[pos][17]);
					jQuery("#PerfilContacto .MiPerfil-Txt").html(listAsociados[pos][4]);

					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(0).html("Folio de asociado AMPI: <strong>"+listAsociados[pos][20]+"</strong>");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(1).html("Licencia Inmobiliaria: <strong>"+listAsociados[pos][21]+"</strong>");				
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(2).html("Años de experiencia: <strong>"+listAsociados[pos][24]+" año(s)</strong>");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(3).html("Edad: <strong>"+listAsociados[pos][26]+" años</strong>");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(4).html("Estado civil: <strong>"+listAsociados[pos][27]+"</strong>");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(5).html("<strong>Historial comercial en el sector:</strong> <br />"+listAsociados[pos][25]+"");

					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(6).html("Teléfono: <a onclick=\"document.location.href = 'tel:+"+listAsociados[pos][8]+"';\" target='_blank'><strong>"+listAsociados[pos][8]+"</strong></a>");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(7).html("Email: <a onclick=\"document.location.href = 'mailto:"+listAsociados[pos][9]+"'\" target='_blank'><strong>"+listAsociados[pos][9]+"</strong></a>");

					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(8).html("");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(9).html("");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(10).html("");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(11).html("");
					jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(12).html("");


					if(listAsociados[pos][10]!="")
						jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(8).html("Twitter: <a onclick=\"document.location.href = '"+listAsociados[pos][10]+"'\" target='_blank'><strong>"+listAsociados[pos][10]+"</strong></a>");
					
					if(listAsociados[pos][11]!="")
						jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(9).html("Facebook: <a onclick=\"document.location.href = '"+listAsociados[pos][11]+"'\" target='_blank'><strong>"+listAsociados[pos][11]+"</strong></a>");
					
					if(listAsociados[pos][12]!="")
						jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(10).html("Instagram: <a onclick=\"document.location.href = '"+listAsociados[pos][12]+"'\" target='_blank'><strong>"+listAsociados[pos][12]+"</strong></a>");

					if(listAsociados[pos][29]!="")
						jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(11).html("Linkedin: <a onclick=\"document.location.href = '"+listAsociados[pos][29]+"'\" target='_blank'><strong>"+listAsociados[pos][29]+"</strong></a>");	

					if(listAsociados[pos][30]!="")
						jQuery("#PerfilContacto .MiPerfil-ListDatos li").eq(12).html("Página web: <a onclick=\"document.location.href = '"+listAsociados[pos][30]+"'\" target='_blank'><strong>"+listAsociados[pos][30]+"</strong></a>");

				
					jQuery("#PerfilContacto .MiPerfil-ListCertificaciones").eq(0).html("");
					jQuery("#PerfilContacto .MiPerfil-ListCertificaciones").eq(1).html("");


					var itemCertificacionAsociado = "";

					if(listAsociados[pos][13]!="")
					{
						var listCertificacionesAsociados = new Array();							
						listCertificacionesAsociados = listAsociados[pos][13];

						for(var j=0; j < listCertificacionesAsociados.length; j++){
							itemCertificacionAsociado += "<li>";
							itemCertificacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
							itemCertificacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCertificacion u-inline-block u-textCenter'></span>";
							itemCertificacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
							itemCertificacionAsociado += ""+listCertificacionesAsociados[j][1];
							itemCertificacionAsociado += "</h4>";
							itemCertificacionAsociado += "</a>";
							itemCertificacionAsociado += "</li>";						
						}
					}

				
					var listCertificacionesAsociados2 = new Array();							
					listCertificacionesAsociados2 = listAsociados[pos][14];

					for(var j=0; j < listCertificacionesAsociados2.length; j++){

						itemCertificacionAsociado += "<li>";
						itemCertificacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
						itemCertificacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCertificacion u-inline-block u-textCenter'></span>";
						itemCertificacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
						itemCertificacionAsociado += ""+listCertificacionesAsociados2[j][1];
						itemCertificacionAsociado += "</h4>";
						itemCertificacionAsociado += "</a>";
						itemCertificacionAsociado += "</li>";						
					}

					jQuery("#PerfilContacto .MiPerfil-ListCertificaciones").eq(0).html(itemCertificacionAsociado);


					var listCapacitacionesAsociados = new Array();							
					listCapacitacionesAsociados = listAsociados[pos][15];

					var itemCapacitacionAsociado = "";

					for(var j=0; j < listCapacitacionesAsociados.length; j++){

						itemCapacitacionAsociado += "<li>";
						itemCapacitacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
						itemCapacitacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCursoDiploma u-inline-block u-textCenter'></span>";
						itemCapacitacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
						itemCapacitacionAsociado += ""+listCapacitacionesAsociados[j][1];
						itemCapacitacionAsociado += "</h4>";
						itemCapacitacionAsociado += "</a>";
						itemCapacitacionAsociado += "</li>";	
					}

				
					var listCapacitacionesAsociados2 = new Array();							
					listCapacitacionesAsociados2 = listAsociados[pos][16];

					for(var j=0; j < listCapacitacionesAsociados2.length; j++){

						itemCapacitacionAsociado += "<li>";
						itemCapacitacionAsociado += "<a class='MiPerfil-ItemListCertificacion u-inline-block u-box-sizing'>";
						itemCapacitacionAsociado += "<span class='MiPerfil-IcoItemList icon-icoCursoDiploma u-inline-block u-textCenter'></span>";
						itemCapacitacionAsociado += "<h4 class='MiPerfil-TitleItemListCertificacion u-inline-block'>";
						itemCapacitacionAsociado += ""+listCapacitacionesAsociados2[j][1];
						itemCapacitacionAsociado += "</h4>";
						itemCapacitacionAsociado += "</a>";
						itemCapacitacionAsociado += "</li>";						
					}

					jQuery("#PerfilContacto .MiPerfil-ListCertificaciones").eq(1).html(itemCapacitacionAsociado);

				
					jQuery("#PerfilContacto .MiPerfil-ListContactos").html("");
					var listContactosAsociados = new Array();							
					listContactosAsociados = listAsociados[pos][18];

					var itemContactoAsociado = "";

					for(var j=0; j < listContactosAsociados.length; j++){
						var posB =  buscarPosicionAsociado(listContactosAsociados[j]);

						itemContactoAsociado += "<li class='u-inline-block'>";
						//itemContactoAsociado += "<a class='MiPerfil-ItemListContacto u-inline-block'>";
						itemContactoAsociado += "<a transition='fade' href='#PerfilContacto'onclick='cargarPerfilMiembro("+listAsociados[posB][0]+");' class='MiPerfil-ItemListContacto u-inline-block'>";					
						itemContactoAsociado += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posB][7]+"' alt='Avatar' />";
						itemContactoAsociado += "</a>";
						itemContactoAsociado += "</li>";
					}

					jQuery("#PerfilContacto .MiPerfil-ListContactos").html(itemContactoAsociado);

				
					if(datosUsuario[2]!=4){
						if(listAsociados[pos][0]==datosUsuario[3]){
							jQuery("#MiPerfil-BtnSolicitar").slideUp('slow');
							jQuery("#MiPerfil-BtnAgregar").slideUp('slow');
						}
						else{
							jQuery("#MiPerfil-BtnSolicitar").slideDown('slow');
							jQuery("#MiPerfil-BtnAgregar").slideDown('slow');
						}
					}

					jQuery("#hdIdAsociadoAgregarAgenda").val(listAsociados[pos][0]);
					jQuery("#hdIdUsuarioAgregarAgenda").val(datosUsuario[0]);				
				}

				function datosPropiedad(pos){
					jQuery(".DetallePropiedades-Tipo").removeClass("Renta");
					jQuery(".DetallePropiedades-Tipo").removeClass("Venta");
					jQuery(".DetallePropiedades-Slider").html("");


					//var datosMiembro = new Array();	
					//datosMiembro = listPropiedades[pos][22];


					var posA =  buscarPosicionAsociado(listPropiedades[pos][15]);

					//alert(pos);

					jQuery(".DetallePropiedades-TitularPropiedad").attr("onclick","datosAsoacido("+listAsociados[posA][0]+");");

					jQuery(".DetallePropiedades-TitularPropiedad img").attr("src",urlBaseAsociado+listAsociados[posA][7]);
					jQuery(".DetallePropiedades-TitularPropiedad p").html(listAsociados[posA][3]+" / "+listAsociados[posA][6]);
					

					jQuery("#hdAgentePropiedad").val(listAsociados[posA][0]);

					var listSliderPropiedad = new Array();							
					listSliderPropiedad = listPropiedades[pos][20];

					for(var j=0; j < listSliderPropiedad.length; j++)
						jQuery(".DetallePropiedades-Slider").append("<li><img src='"+urlBasePropiedad+listSliderPropiedad[j][1]+"' alt='Slider' /></li>");
				
					jQuery(".DetallePropiedades-Tipo").html(listPropiedades[pos][21]+"");
					jQuery(".DetallePropiedades-Tipo").addClass(listPropiedades[pos][21]);
					jQuery(".DetallePropiedades-Title").html(listPropiedades[pos][1]);
					jQuery(".DetallePropiedades-Precio").html("Precio "+listPropiedades[pos][21]+": $"+listPropiedades[pos][3]);

					jQuery(".DetallePropiedades-Direccion").html(listPropiedades[pos][10]+"");

					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(0).html("<span class='icoPropiedad--Casa'></span>"+listPropiedades[pos][24]);
					
					if(listPropiedades[pos][21]=="Renta")
						jQuery(".DetallePropiedades-ListDatosGenerales li").eq(1).html("<span class='icoPropiedad--PrecioRenta'></span>PrecioRenta MN <span>"+listPropiedades[pos][24]+"</span>");
					else
						jQuery(".DetallePropiedades-ListDatosGenerales li").eq(1).html("<span class='icoPropiedad--PrecioRenta'></span>PrecioVenta MN <span>"+listPropiedades[pos][24]+"</span>");

					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(2).html("<span class='icoPropiedad--Superficie Total'></span>"+listPropiedades[pos][4]+"m2 Superficie total");
					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(3).html("<span class='icoPropiedad--Superficie Construida'></span>"+listPropiedades[pos][5]+"m2 Superficie construida");
					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(4).html("<span class='icoPropiedad--Recamaras'></span>"+listPropiedades[pos][13]+" Habitaciones");
					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(5).html("<span class='icoPropiedad--Banio'></span>"+listPropiedades[pos][12]+" Baños");
					jQuery(".DetallePropiedades-ListDatosGenerales li").eq(6).html("<span class='icoPropiedad--Antiguedad'></span>"+listPropiedades[pos][11]+" Plantas");


					jQuery(".DetallePropiedades-ListCaracteristicas").html("");
					
					jQuery(".DetallePropiedades-ListCaracteristicas").append("<li>"+(listPropiedades[pos][26])[0][1]+"</li>");

					var listCaracteristicasPropiedad = new Array();							
					listCaracteristicasPropiedad = listPropiedades[pos][29];

					for(var j=0; j < listCaracteristicasPropiedad.length; j++)
						jQuery(".DetallePropiedades-ListCaracteristicas").append("<li>"+listCaracteristicasPropiedad[j][1]+"</li>");

					jQuery(".DetallePropiedades-Info").html(listPropiedades[pos][2]);

					jQuery(".DetallePropiedades-ListDatosUbicacion span").eq(0).html(listPropiedades[pos][35]);
					jQuery(".DetallePropiedades-ListDatosUbicacion span").eq(1).html(listPropiedades[pos][33]);
					
					activar_mapaDetallePropiedad(listPropiedades[pos][8],listPropiedades[pos][9]);


					jQuery(".DetallePropiedades-BtnContactarAgenda").addClass('u-inline-block');
					jQuery(".DetallePropiedades-BtnContactarAgenda").slideDown('slow');

					jQuery("#DetallePropiedades-BtnConcluirVenta").slideUp('slow');
					jQuery("#DetallePropiedades-BtnEditarPropiedad").slideUp('slow');

					if(listPropiedades[pos][30]==1){
						jQuery(".DetallePropiedades-BtnContactarAgenda").removeClass('u-inline-block');
						jQuery(".DetallePropiedades-BtnContactarAgenda").slideUp('slow');

						jQuery("#DetallePropiedades-BtnConcluirVenta").slideDown('slow');
						jQuery("#DetallePropiedades-BtnEditarPropiedad").slideDown('slow');

						jQuery(".ConcluirVenta-MontoOriginal").html("<strong>Precio:</strong> $"+listPropiedades[pos][3]);
						jQuery(".ConcluirVenta-OperacionOriginal").html("<strong>Operación:</strong> "+listPropiedades[pos][21]);

					}
					
					jQuery("#hdIdPropiedadVenta").val(listPropiedades[pos][0]);



					if(datosUsuario[2]==4){
						jQuery(".PostNoticia-Compartir").attr('onclick',"window.plugins.socialsharing.share('"+listPropiedades[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Propiedades/verPropiedadPDF/"+listPropiedades[pos][0]+"/"+listPropiedades[pos][15]+"');");
						jQuery(".DetallePropiedades-CenterBarraInferior a").eq(0).attr('onclick',"window.plugins.socialsharing.share('"+listPropiedades[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Propiedades/verPropiedadPDF/"+listPropiedades[pos][0]+"/"+listPropiedades[pos][15]+"');");
						
					}
					else if(datosUsuario[2]!=4)
					{
						jQuery(".PostNoticia-Compartir").attr('onclick',"window.plugins.socialsharing.share('"+listPropiedades[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Propiedades/verPropiedadPDF/"+listPropiedades[pos][0]+"/"+datosUsuario[3]+"');");
						jQuery(".DetallePropiedades-CenterBarraInferior a").eq(0).attr('onclick',"window.plugins.socialsharing.share('"+listPropiedades[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Propiedades/verPropiedadPDF/"+listPropiedades[pos][0]+"/"+datosUsuario[3]+"');");
					}

					jQuery("#DetallePropiedades-BtnEditarPropiedad").attr("onclick","verDatosPropiedad("+pos+")");

					if(listPropiedades[pos][27]==1)
						jQuery(".DetallePropiedades-BtnAgregar").addClass("activo");
					else
						jQuery(".DetallePropiedades-BtnAgregar").removeClass("activo");

					

					jQuery(".DetallePropiedades-BtnAgregar").data("posicion",pos);
					jQuery(".DetallePropiedades-BtnAgregar").data("posicionfavorita",punteroFavorito);
					jQuery(".DetallePropiedades-BtnAgregar").data("propiedad",listPropiedades[pos][0]);
					jQuery(".DetallePropiedades-BtnAgregar").data("usuario",datosUsuario[0]);

					activarSlider1();

					setTimeout(function(){
						activar_mapaDetallePropiedad(listPropiedades[pos][8],listPropiedades[pos][9]);
					},1000);
			}

			function verDatosPropiedad(pos){

				jQuery("#hdIdPropiedad").val(listPropiedades[pos][0]);
				jQuery("#txtTituloEP").val(listPropiedades[pos][1]);
				jQuery("#txtDescripcionEP").val(listPropiedades[pos][2]);
				jQuery("#txtPrecioEP").val(listPropiedades[pos][3]);
				jQuery("#stTipoPropiedadEP option[value="+ listPropiedades[pos][17] +"]").attr("selected",true);
				jQuery("#stOperacionPropiedadEP option[value="+ listPropiedades[pos][6] +"]").attr("selected",true);
				jQuery("#stOperacionCompartidaEP option[value="+ listPropiedades[pos][7] +"]").attr("selected",true);
				jQuery("#txtNumPlantasEP").val(listPropiedades[pos][11]);
				jQuery("#txtNumBaniosEP").val(listPropiedades[pos][12]);
				jQuery("#txtNumHabitacionesEP").val(listPropiedades[pos][13]);
				jQuery("#txtNumAreaEP").val(listPropiedades[pos][4]);
				jQuery("#txtNumAreaCEP").val(listPropiedades[pos][5]);
				jQuery("#stMunicipiosEP option[value="+ listPropiedades[pos][34] +"]").attr("selected",true);

				municipiosEdicion(listPropiedades[pos][34],listPropiedades[pos][32]);

				jQuery("#txtDireccionEP").val(listPropiedades[pos][10]);

				activarMapaEditarPropiedad(listPropiedades[pos][8],listPropiedades[pos][9]);

				//jQuery("#txtDescripcionEP").val(listPropiedades[pos][2]);
				jQuery("#cbAmueblamientoEP"+listPropiedades[pos][19]).attr('checked', true);
				//jQuery("#txtDescripcionEP").val(listPropiedades[pos][2]);
				//jQuery("#txtDescripcionEP").val(listPropiedades[pos][2]);
				jQuery("#txtFechaPublicacionEP").val(listPropiedades[pos][31]);
				

				jQuery('#EditarPropiedad .lista').trigger('update');


				var listSliderPropiedad = new Array();							
				listSliderPropiedad = listPropiedades[pos][20];

				jQuery("#EditarPropiedad .NuevaPropiedad-ListImages").html("");
				var slider = jQuery('#sliderEP');

				for(var j=0; j < listSliderPropiedad.length; j++){
					jQuery("#EditarPropiedad .NuevaPropiedad-ListImages").append("<li class='u-inline-block'><a class='u-inline-block'><span class='u-position-absolute u-inline-block' onclick='eliminar_sliderPropiedadE("+j+","+listSliderPropiedad[j][0]+")'>X</span><img src='http://villahermosa.ampiserver.net/modulos/assets/fileClient/"+listSliderPropiedad[j][1]+"'></a></li>");

					if(slider.val()=="")
						slider.val(listSliderPropiedad[j][0]);
					else
						slider.val(slider.val()+","+listSliderPropiedad[j][0]);
				}

				

				var listCaracteristicasPropiedadE = new Array();							
				listCaracteristicasPropiedadE = listPropiedades[pos][29];


				jQuery(".NuevaPropiedad-List").eq(4).html("");

				var itemCaracteristicaPropiedadE = "";
	 
				for(var a=0; a < listCaracteristicasPropiedadesE.length; a++){
						
					itemCaracteristicaPropiedadE += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
					
					if(existeCaracteristicaPropiedad(listCaracteristicasPropiedadE,listCaracteristicasPropiedadesE[a][0]))
						itemCaracteristicaPropiedadE += "<input name='cbCaracteristicaEP"+a+"' id='cbCaracteristicaEP"+a+"' type='checkbox' value='"+listCaracteristicasPropiedadesE[a][0]+"' checked>";
					else
						itemCaracteristicaPropiedadE += "<input name='cbCaracteristicaEP"+a+"' id='cbCaracteristicaEP"+a+"' type='checkbox' value='"+listCaracteristicasPropiedadesE[a][0]+"'>";				
					
					itemCaracteristicaPropiedadE += "<label class='lbCheckbox' for='cbCaracteristicaEP"+a+"'>"+listCaracteristicasPropiedadesE[a][1]+"</label>";
					itemCaracteristicaPropiedadE += "</li>";
				}

				jQuery("#num_caracteristicaEP").val(listCaracteristicasPropiedadesE.length);
				jQuery(".NuevaPropiedad-List").eq(4).html(itemCaracteristicaPropiedadE);


				jQuery("#hdIdVendedorEP").val(listPropiedades[pos][15]);


				
			}

			//Buscar si una caracteristica existe en una propiedad
			function existeCaracteristicaPropiedad(listCaracteristicasPropiedadE,id_c){

				for(var j=0; j < listCaracteristicasPropiedadE.length; j++)
					if(listCaracteristicasPropiedadE[j][0]==id_c)
						return true;
				
				return false;
			}


			function agregarFavorito(pos){

				var itemsPropiedadFavorita = "";

				var listSliderPropiedad = new Array();							
				listSliderPropiedad = listPropiedades[pos][20];

				itemsPropiedadFavorita +="<li class='FavoritosPropiedades-ItemList'>";
				itemsPropiedadFavorita +="<span onclick='quitarFavorito("+pos+","+punteroFavorito+","+listPropiedades[pos][0]+","+datosUsuario[0]+");' class='FavoritosPropiedades-QuitarFavorito u-position-absolute'>x</span>";
				itemsPropiedadFavorita +="<a href='#DetallePropiedades' transition='slide' onclick='datosPropiedad("+pos+");' class='FavoritosPropiedades-LinkList  u-inline-block u-redondeado--04' style='background-image: url(\""+urlBasePropiedad+listSliderPropiedad[0][1]+"\")'>";
				itemsPropiedadFavorita +="<div class='FavoritosPropiedades-InfoList u-position-absolute'>";
				itemsPropiedadFavorita +="<span class='Home-TipoPropiedad "+listPropiedades[pos][21]+" u-redondeado u-inline-block'>"+listPropiedades[pos][21]+"</span>";
				itemsPropiedadFavorita +="<h4 class='FavoritosPropiedades-TitleList u-efecto'>"+listPropiedades[pos][1]+"</h4>";
				itemsPropiedadFavorita +="<p class='FavoritosPropiedades-PrecioList u-inline-block'>$"+listPropiedades[pos][3]+"</p>";
				itemsPropiedadFavorita +="<ul class='u-floatRight'>";
				itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoBanio'></span>"+listPropiedades[pos][12]+"</li>";
				itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoCama'></span>"+listPropiedades[pos][13]+"</li>";
				itemsPropiedadFavorita +="<li class='u-inline-block'><span class='icon-icoMedidas'></span>"+listPropiedades[pos][4]+"m2.</li>";
				itemsPropiedadFavorita +="</ul>";
				itemsPropiedadFavorita +="</div>";
				itemsPropiedadFavorita +="</a>";
				itemsPropiedadFavorita +="</li>";

				punteroFavorito++;

				jQuery("#FavoritosPropiedades-List--Favoritas").append(itemsPropiedadFavorita);
			}


			function quitarFavorito(posicion,posicionFavorito,id_p,id_u){
				jQuery.ajax(
				{
					//url		: "http://localhost/adminAMPIVillahermosa/ajax/propiedadFavoritaApp.php",
					url		: "http://villahermosa.ampiserver.net/ajax/propiedadFavoritaApp.php",
					type	: "POST",
					data	: 
							{
								tipo				: 0,
								id_propiedad		: id_p,											
								id_usuario			: id_u
							},
							success	: function(HTMLRespuesta)
							{		
								jQuery("#FavoritosPropiedades-List--Favoritas li.FavoritosPropiedades-ItemList").eq(posicionFavorito).slideUp("slow");
								jQuery("#Home-ListPropiedades--Propiedades .Home-icoFavorito").eq(posicion).removeClass('activo');
								jQuery("#FavoritosPropiedades-List--Lista .Home-icoFavorito").eq(posicion).removeClass('activo');			
								
								listPropiedades[posicion][27]=0;
							}
					});
			}

			function datosBoletin(pos){
				jQuery(".PostNoticia-ImgDescatada").html("<img src='"+urlBaseEntrada+listEntradas[pos][3]+"' alt='Destacada' />");
				jQuery("#dtFechaPostBoletin").html(listEntradas[pos][4]+"");
				jQuery("#dtTitlePostBoletin").html(listEntradas[pos][1]);
				jQuery("#dtTextoPostBoletin").html(listEntradas[pos][2]);


				if(datosUsuario[2]!=4)
					if(listEntradas[pos][8]==0){
						notificar(listEntradas[pos][0],2);
						listEntradas[pos][8]=1;
						cargarNotificaciones();
					}	

			}

			function datosGaleria(pos){
				var listSliderGaleria = new Array();
				jQuery(".PostNoticia-Slider").html("");
			
				listSliderGaleria = listEntradas[pos][7];

				for(var j=0; j < listSliderGaleria.length; j++)
					jQuery(".PostNoticia-Slider").append("<li><img src='"+urlBaseSlider+listSliderGaleria[j]+"' alt='Slider' /></li>");

				jQuery("#dtFechaPostGaleria").html(listEntradas[pos][4]+"");
				jQuery("#dtTitlePostGaleria").html(listEntradas[pos][1]);
				jQuery("#dtTextoPostGaleria").html(listEntradas[pos][2]);

				activarSlider2();
			}


			function datosEvento(pos){
				jQuery("#EventoNoticia .CursoNoticia-Img").html("<img src='"+urlBaseEvento+listEventos[pos][2]+"' alt='Evento' />");
				jQuery("#EventoNoticia .CursoNoticia-Fecha em").html(listEventos[pos][20]+" de "+listEventos[pos][19]+" de "+listEventos[pos][18]);
				jQuery("#EventoNoticia .CursoNoticia-Title").html(listEventos[pos][1]);
				jQuery("#EventoNoticia .CursoNoticia-Text").html(listEventos[pos][15]);
				
				jQuery(".CursoNoticia-List--Eventos li").eq(0).html("<strong>Tipo de evento:</strong> <span> "+listEventos[pos][24]+"</span>");
				jQuery(".CursoNoticia-List--Eventos li").eq(1).html("<strong>Sede:</strong> <span> "+listEventos[pos][12]+"</span>");

				if(listEventos[pos][7]==1){
					jQuery(".CursoNoticia-List--Eventos li").eq(2).html("<strong>Costo:</strong> <span>$"+listEventos[pos][6]+"</span>");

					jQuery("#CursosNoticias-BtnInscribirme").slideDown("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratis").slideUp("slow");
				}
					
				else{
					jQuery(".CursoNoticia-List--Eventos li").eq(2).html("<strong>Costo:</strong> <span>Gratuito</span>");

					jQuery("#CursosNoticias-BtnInscribirme").slideUp("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratis").slideDown("slow");
				}
					

				jQuery(".CursoNoticia-List--Eventos li").eq(3).html("<strong>Fechas:</strong> <span>"+listEventos[pos][20]+" de "+listEventos[pos][19]+" de "+listEventos[pos][18]+" al "+listEventos[pos][23]+" de "+listEventos[pos][22]+" de "+listEventos[pos][21]+"</span>");
				jQuery(".CursoNoticia-List--Eventos li").eq(4).html("<strong>Hora:</strong> <span>"+listEventos[pos][10]+"</span>");

				jQuery(".CursoNoticia-ListContacto li").eq(0).html("<strong>Telefono:</strong> <a onclick=\"document.location.href = 'tel:+"+listEventos[pos][26]+"';\" target='_blank'>"+listEventos[pos][26]+"</a>");
				jQuery(".CursoNoticia-ListContacto li").eq(1).html("<strong>Email:</strong> <a onclick=\"document.location.href = 'mailto:+"+listEventos[pos][27]+"';\" target='_blank'>"+listEventos[pos][27]+"</a>");
				
				if(listEventos[pos][28]!="")
					jQuery(".CursoNoticia-ListContacto li").eq(2).html("<strong>Facebook:</strong> <a onclick=\"document.location.href = '"+listEventos[pos][28]+"';\" target='_blank'>"+listEventos[pos][28]+"</a>");

				activar_mapaInterior('DetallePropiedades-MapaEvento',listEventos[pos][13],listEventos[pos][14]);

				jQuery(".PagoEvento-Total").html("$"+listEventos[pos][6]);
				jQuery("#hdIdEventoPagoEvento").val(listEventos[pos][0]);
				jQuery("#hdIdUsuarioPagoEvento").val(datosUsuario[0]);
				jQuery("#hdPosEventoPago").val(pos);

				if(listEventos[pos][29]==1){
					jQuery("#CursosNoticias-BtnInscribirme").slideUp("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratis").slideUp("slow");
				}

				jQuery("#PagoEvento-BtnPagoEvento").slideDown("slow");


				if(datosUsuario[2]!=4)
					if(listEventos[pos][30]==0){
						notificar(listEventos[pos][0],1);
						listEventos[pos][30]=1;
						cargarNotificaciones();
					}				
		
				jQuery("#EventoNoticia .CursoNoticia-Compartir").attr('onclick',"window.plugins.socialsharing.share('"+listEventos[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Eventos/verEventoPDF/"+listEventos[pos][0]+"');");
				
				setTimeout(function(){
					activar_mapaInterior('DetallePropiedades-MapaEvento',listEventos[pos][13],listEventos[pos][14]);
				},1000);	
			}


			function datosCapacitacion(pos){
				var posAso = buscarPosicionAsociado(datosUsuario[3]);

				jQuery("#CursoNoticia .CursoNoticia-Img").html("<img src='"+urlBaseCapacitacion+listCapacitaciones[pos][2]+"' alt='Curso' />");
				jQuery("#CursoNoticia .CursoNoticia-Fecha em").html(listCapacitaciones[pos][19]+" de "+listCapacitaciones[pos][18]+" de "+listCapacitaciones[pos][17]);
				jQuery("#CursoNoticia .CursoNoticia-Title").html(listCapacitaciones[pos][1]);
				jQuery("#CursoNoticia .CursoNoticia-Text").html(listCapacitaciones[pos][13]);

				jQuery("#CursoNoticia .CursoNoticia-List li").eq(0).html("<strong>Tipo de capacitación:</strong> <span> "+listCapacitaciones[pos][22]+"</span>");
				jQuery("#CursoNoticia .CursoNoticia-List li").eq(1).html("<strong>Nivel:</strong> <span> "+listCapacitaciones[pos][30]+"</span>");
				jQuery("#CursoNoticia .CursoNoticia-List li").eq(2).html("<strong>Duración:</strong> <span> "+listCapacitaciones[pos][29]+" hrs</span>");
								
				jQuery("#CursoNoticia .CursoNoticia-List li").eq(3).html("<strong>Sede:</strong> <span> "+listCapacitaciones[pos][10]+"</span>");
				if(listCapacitaciones[pos][6]==1){

					if(listAsociados[posAso][2]==1)
						jQuery("#CursoNoticia .CursoNoticia-List li").eq(4).html("<strong>Costo:</strong> <span>$"+listCapacitaciones[pos][5]+"</span>");
					else if(listAsociados[posAso][2]==2)
						jQuery("#CursoNoticia .CursoNoticia-List li").eq(4).html("<strong>Costo:</strong> <span>$"+listCapacitaciones[pos][31]+"</span>");

					jQuery("#CursosNoticias-BtnInscribirmeCapaticacion").slideDown("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").slideUp("slow");
				}
				else{
					jQuery("#CursoNoticia .CursoNoticia-List li").eq(4).html("<strong>Costo:</strong> <span>Gratuito</span>");

					jQuery("#CursosNoticias-BtnInscribirmeCapaticacion").slideUp("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").slideDown("slow");
				}

				jQuery("#CursoNoticia .CursoNoticia-List li").eq(5).html("<strong>Fechas:</strong> <span>"+listCapacitaciones[pos][19]+" de "+listCapacitaciones[pos][18]+" de "+listCapacitaciones[pos][17]+" al "+listCapacitaciones[pos][22]+" de "+listCapacitaciones[pos][21]+" de "+listCapacitaciones[pos][20]+"</span>");
				jQuery("#CursoNoticia .CursoNoticia-List li").eq(6).html("<strong>Horario:</strong> <span>"+listCapacitaciones[pos][15]+"</span>");
				jQuery("#CursoNoticia .CursoNoticia-List li").eq(7).html("<strong>Instructor:</strong> <span>"+listCapacitaciones[pos][32]+"</span>");
								
				jQuery("#CursoNoticia .CursoNoticia-ListContacto li").eq(0).html("<strong>Contacto:</strong> "+listCapacitaciones[pos][24]);
				jQuery("#CursoNoticia .CursoNoticia-ListContacto li").eq(1).html("<strong>Telefono:</strong> <a onclick=\"document.location.href = 'tel:+"+listCapacitaciones[pos][25]+"';\" target='_blank'>"+listCapacitaciones[pos][25]+"</a>");
				jQuery("#CursoNoticia .CursoNoticia-ListContacto li").eq(2).html("<strong>Email:</strong> <a onclick=\"document.location.href = 'mailto:+"+listCapacitaciones[pos][26]+"';\" target='_blank'>"+listCapacitaciones[pos][26]+"</a>");
				
				
				if(listCapacitaciones[pos][27]!="")
					jQuery("#CursoNoticia .CursoNoticia-ListContacto li").eq(3).html("<strong>Facebook:</strong> <a onclick=\"document.location.href = '"+listCapacitaciones[pos][27]+"';\" target='_blank'>"+listCapacitaciones[pos][27]+"</a>");

				activar_mapaInterior('DetallePropiedades-MapaCapacitacion',listCapacitaciones[pos][11],listCapacitaciones[pos][12]);
				
				jQuery(".PagoEvento-TotalCapacitacion").html("$"+listCapacitaciones[pos][5]);
				jQuery("#hdIdCapacitacionPagoCapacitacion").val(listCapacitaciones[pos][0]);
				jQuery("#hdIdUsuarioPagoCapacitacion").val(datosUsuario[0]);
				jQuery("#hdPosCapacitacionPago").val(pos);


				//alert(listCapacitaciones[pos][28]);

				if(listCapacitaciones[pos][28]==1){
					jQuery("#CursosNoticias-BtnInscribirmeCapaticacion").slideUp("slow");
					jQuery("#CursosNoticias-BtnInscribirmeGratisCapaticacion").slideUp("slow");
				}

				jQuery("#PagoEvento-BtnPagoCapacitacion").slideDown("slow");

				jQuery("#CursoNoticia .CursoNoticia-Compartir").attr('onclick',"window.plugins.socialsharing.share('"+listCapacitaciones[pos][1]+"', null, null, 'http://villahermosa.ampiserver.net/modulos/Capacitacion/verCapacitacionPDF/"+listCapacitaciones[pos][0]+"');");

				setTimeout(function(){
					activar_mapaInterior('DetallePropiedades-MapaCapacitacion',listCapacitaciones[pos][11],listCapacitaciones[pos][12]);
				},1000);
			}

			function cargarAgenda(){

				var listAgendaTotal = new Array();

				var listEventosAgenda = new Array();
				listEventosAgenda = datosUsuario[4];

				var listCapacitacionesAgenda = new Array();
				listCapacitacionesAgenda = datosUsuario[5];

				var j=0;

				for(j=0; j < listEventosAgenda.length; j++){
					
					listAgendaTotal[j] = new Array();

					listAgendaTotal[j][0] = listEventosAgenda[j][0];
					listAgendaTotal[j][1] = listEventosAgenda[j][1];
					listAgendaTotal[j][2] = listEventosAgenda[j][2];

				}

				for(var a=0; a < listCapacitacionesAgenda.length; a++){
					
					listAgendaTotal[j] = new Array();

					listAgendaTotal[j][0] = listCapacitacionesAgenda[a][0];
					listAgendaTotal[j][1] = listCapacitacionesAgenda[a][1];
					listAgendaTotal[j][2] = listCapacitacionesAgenda[a][2];

					j++;
				}

				listAgendaG = datosUsuario[6];
				
				var taa=0;
							
				for(var a=0; a < listAgendaG.length; a++){
					if(listAgendaG[a][11]==1){
						listAgendaTotal[j] = new Array();

						listAgendaTotal[j][0] = listAgendaG[a][0];
						listAgendaTotal[j][1] = 3;
						listAgendaTotal[j][2] = listAgendaG[a][6];

						j++;
						taa++;
					}
				}

				jQuery(".PerFil-TotalPostItemList").eq(3).html(""+taa);

				listMensajeG = datosUsuario[7];


				for(var a=0; a < listMensajeG.length; a++){
					
					listAgendaTotal[j] = new Array();

					listAgendaTotal[j][0] = listMensajeG[a][0];
					listAgendaTotal[j][1] = 4;
					listAgendaTotal[j][2] = listMensajeG[a][3];

					j++;					
				}				


				
				listAgendaTotal.orderByString(2);


				jQuery(".Agenta-ListTotal").html("");
				var mesAct="";

				var itemsListaAgendaT = "";
				var banEVentoAgenda = false;
				var banCapacitacionAgenda = false;
				var banCitasAgenda = false;
				var banMensajesAgenda = false;


				//alert(listAgendaTotal.length);


				for(var a=0; a < listAgendaTotal.length; a++){

					if(listAgendaTotal[a][1] == 1){

						banEVentoAgenda = true;

						var pos = buscarPosicionEvento(listAgendaTotal[a][0]);

						if(a==0)
						{
							mesAct = listEventos[pos][19];

							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listEventos[pos][19];
							itemsListaAgendaT += "</h3>";

							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaT += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listEventos[pos][20];
							itemsListaAgendaT += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaT += ""+listEventos[pos][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listEventos[pos][12];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";											
						}
						else{
							if(mesAct == listEventos[pos][19]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listEventos[pos][20];
								itemsListaAgendaT += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listEventos[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listEventos[pos][12];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";
							}
							else{
								mesAct = listEventos[pos][19];

								itemsListaAgendaT += "</ul>";

								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listEventos[pos][19];
								itemsListaAgendaT += "</h3>";

								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listEventos[pos][20];
								itemsListaAgendaT += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listEventos[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listEventos[pos][12];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";	
							}
						}

					}
					
					else if(listAgendaTotal[a][1] == 2){

						banCapacitacionAgenda = true;
	
						var pos = buscarPosicionCapacitacion(listAgendaTotal[a][0]);
	
						if(a==0)
						{
							mesAct = listCapacitaciones[pos][18];
	
							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listCapacitaciones[pos][18];
							itemsListaAgendaT += "</h3>";
	
							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaT += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listCapacitaciones[pos][19];
							itemsListaAgendaT += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaT += ""+listCapacitaciones[pos][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listCapacitaciones[pos][10];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";											
						}
						else{
							if(mesAct == listCapacitaciones[pos][18]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][19];
								itemsListaAgendaT += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][10];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";	
							}
							else{
								mesAct = listCapacitaciones[pos][18];
	
								itemsListaAgendaT += "</ul>";
	
								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][18];
								itemsListaAgendaT += "</h3>";
			
								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][19];
								itemsListaAgendaT += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listCapacitaciones[pos][10];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";	
							}
						}
					}

					else if(listAgendaTotal[a][1] == 3){

						banCitasAgenda = true;
	
						var pos = buscarPosicionAgenda(listAgendaTotal[a][0]);
						var posAs=-1;

						if(listAgendaG[pos][2]!=4)
							posAs = buscarPosicionAsociado(listAgendaG[pos][13]);
	
						if(a==0)
						{
							mesAct = listAgendaG[pos][12];
	
							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listAgendaG[pos][9];
							itemsListaAgendaT += "</h3>";
	
							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listAgendaG[pos][8];
							itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
							if(listAgendaG[pos][2]==4)
								itemsListaAgendaT += ""+listAgendaG[pos][12];
							else
								itemsListaAgendaT += ""+listAsociados[posAs][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listAgendaG[pos][4];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";											
						}
						else{
							if(mesAct == listAgendaG[pos][12]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listAgendaG[pos][8];
								itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								if(listAgendaG[pos][2]==4)
									itemsListaAgendaT += ""+listAgendaG[pos][12];
								else
									itemsListaAgendaT += ""+listAsociados[posAs][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listAgendaG[pos][4];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";				
							}
							else{
								mesAct = listAgendaG[pos][12];
	
								itemsListaAgendaT += "</ul>";
	
								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listAgendaG[pos][9];
								itemsListaAgendaT += "</h3>";
		
								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listAgendaG[pos][8];
								itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
								if(listAgendaG[pos][2]==4)
									itemsListaAgendaT += ""+listAgendaG[pos][12];
								else
									itemsListaAgendaT += ""+listAsociados[posAs][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listAgendaG[pos][4];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";
							}
						}
					}
					else if(listAgendaTotal[a][1] == 4){

						banMensajesAgenda = true;
						var pos = buscarPosicionMensaje(listAgendaTotal[a][0]);
												
						if(a==0)
						{
							mesAct = listMensajeG[pos][7];
	
							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listMensajeG[pos][7];
							itemsListaAgendaT += "</h3>";
	
							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listMensajeG[pos][4];
							itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
							itemsListaAgendaT += ""+listMensajeG[pos][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";											
						}
						else{
							if(mesAct == listMensajeG[pos][7]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][4];
								itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";				
							}
							else{
								mesAct = listMensajeG[pos][7];
	
								itemsListaAgendaT += "</ul>";
	
								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listMensajeG[pos][7];
								itemsListaAgendaT += "</h3>";
		
								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][4];
								itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
								itemsListaAgendaT += ""+listMensajeG[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";
							}
						}
					}

				}

				if(banCapacitacionAgenda || banEVentoAgenda || banCitasAgenda || banMensajesAgenda)
					itemsListaAgendaT += "</ul>";
				
				jQuery(".Agenta-ListTotal").html(itemsListaAgendaT);






				jQuery(".Agenta-ListTotalEventos").html("");
				var mesAct="";

				var itemsListaAgendaTE = "";

				for(var a=0; a < listEventosAgenda.length; a++){

					var pos = buscarPosicionEvento(listEventosAgenda[a][0]);

					if(a==0)
					{
						mesAct = listEventos[pos][19];

						itemsListaAgendaTE += "<h3 class='Agenda-TitleMes'>";
						itemsListaAgendaTE += ""+listEventos[pos][19];
						itemsListaAgendaTE += "</h3>";

						itemsListaAgendaTE += "<ul class='CursosNoticias-List'>";
						itemsListaAgendaTE += "<li class='CursosNoticias-ItemList'>";
						itemsListaAgendaTE += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
						itemsListaAgendaTE += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
						itemsListaAgendaTE += ""+listEventos[pos][20];
						itemsListaAgendaTE += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
						itemsListaAgendaTE += "</time>";
						itemsListaAgendaTE += "<div class='CursosNoticias-InfoList u-inline-block'>";
						itemsListaAgendaTE += "<div>";
						itemsListaAgendaTE += "<h4 class='CursosNoticias-TitleList u-efecto'>";
						itemsListaAgendaTE += ""+listEventos[pos][1];
						itemsListaAgendaTE += "</h4>";
						itemsListaAgendaTE += "<p>";
						itemsListaAgendaTE += ""+listEventos[pos][12];
						itemsListaAgendaTE += "</p>";
						itemsListaAgendaTE += "</div>";
						itemsListaAgendaTE += "</div>";
						itemsListaAgendaTE += "</a>";
						itemsListaAgendaTE += "</li>";											
					}
					else 
					{
						if(mesAct == listEventos[pos][19]){
							itemsListaAgendaTE += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaTE += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaTE += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaTE += ""+listEventos[pos][20];
							itemsListaAgendaTE += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
							itemsListaAgendaTE += "</time>";
							itemsListaAgendaTE += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaTE += "<div>";
							itemsListaAgendaTE += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaTE += ""+listEventos[pos][1];
							itemsListaAgendaTE += "</h4>";
							itemsListaAgendaTE += "<p>";
							itemsListaAgendaTE += ""+listEventos[pos][12];
							itemsListaAgendaTE += "</p>";
							itemsListaAgendaTE += "</div>";
							itemsListaAgendaTE += "</div>";
							itemsListaAgendaTE += "</a>";
							itemsListaAgendaTE += "</li>";
						}
						else {
							mesAct = listEventos[pos][19];

							itemsListaAgendaTE += "</ul>";

							itemsListaAgendaTE += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaTE += ""+listEventos[pos][19];
							itemsListaAgendaTE += "</h3>";

							itemsListaAgendaTE += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaTE += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaTE += "<a href='#EventoNoticia' onclick='datosEvento("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaTE += "<time datetime='"+listEventos[pos][8]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaTE += ""+listEventos[pos][20];
							itemsListaAgendaTE += "<span class='u-block'>"+listEventos[pos][19]+"</span>";
							itemsListaAgendaTE += "</time>";
							itemsListaAgendaTE += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaTE += "<div>";
							itemsListaAgendaTE += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaTE += ""+listEventos[pos][1];
							itemsListaAgendaTE += "</h4>";
							itemsListaAgendaTE += "<p>";
							itemsListaAgendaTE += ""+listEventos[pos][12];
							itemsListaAgendaTE += "</p>";
							itemsListaAgendaTE += "</div>";
							itemsListaAgendaTE += "</div>";
							itemsListaAgendaTE += "</a>";
							itemsListaAgendaTE += "</li>";	
						}
					}					
					
				}

				if(listEventosAgenda.length>0)
					itemsListaAgendaTE += "</ul>";
				
				jQuery(".Agenta-ListTotalEventos").html(itemsListaAgendaTE);







				jQuery(".Agenta-ListTotalCapacitaciones").html("");
				var mesAct="";

				var itemsListaAgendaTC = "";

				for(var a=0; a < listCapacitacionesAgenda.length; a++){

					var pos = buscarPosicionCapacitacion(listCapacitacionesAgenda[a][0]);

					if(a==0)
					{
						mesAct = listCapacitaciones[pos][18];
	
						itemsListaAgendaTC += "<h3 class='Agenda-TitleMes'>";
						itemsListaAgendaTC += ""+listCapacitaciones[pos][18];
						itemsListaAgendaTC += "</h3>";
	
						itemsListaAgendaTC += "<ul class='CursosNoticias-List'>";
						itemsListaAgendaTC += "<li class='CursosNoticias-ItemList'>";
						itemsListaAgendaTC += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
						itemsListaAgendaTC += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Cursos u-inline-block u-textCenter u-efecto'>";
						itemsListaAgendaTC += ""+listCapacitaciones[pos][19];
						itemsListaAgendaTC += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
						itemsListaAgendaTC += "</time>";
						itemsListaAgendaTC += "<div class='CursosNoticias-InfoList u-inline-block'>";
						itemsListaAgendaTC += "<div>";
						itemsListaAgendaTC += "<h4 class='CursosNoticias-TitleList u-efecto'>";
						itemsListaAgendaTC += ""+listCapacitaciones[pos][1];
						itemsListaAgendaTC += "</h4>";
						itemsListaAgendaTC += "<p>";
						itemsListaAgendaTC += ""+listCapacitaciones[pos][10];
						itemsListaAgendaTC += "</p>";
						itemsListaAgendaTC += "</div>";
						itemsListaAgendaTC += "</div>";
						itemsListaAgendaTC += "</a>";
						itemsListaAgendaTC += "</li>";
					}
					else
					{
						if(mesAct == listCapacitaciones[pos][18]){
							itemsListaAgendaTC += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaTC += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaTC += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Cursos u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][19];
							itemsListaAgendaTC += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
							itemsListaAgendaTC += "</time>";
							itemsListaAgendaTC += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaTC += "<div>";
							itemsListaAgendaTC += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][1];
							itemsListaAgendaTC += "</h4>";
							itemsListaAgendaTC += "<p>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][10];
							itemsListaAgendaTC += "</p>";
							itemsListaAgendaTC += "</div>";
							itemsListaAgendaTC += "</div>";
							itemsListaAgendaTC += "</a>";
							itemsListaAgendaTC += "</li>";
						}
						else{
							mesAct = listCapacitaciones[pos][18];
	
							itemsListaAgendaTC += "</ul>";
	
							itemsListaAgendaTC += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][18];
							itemsListaAgendaTC += "</h3>";
		
							itemsListaAgendaTC += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaTC += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaTC += "<a href='#CursoNoticia' onclick='datosCapacitacion("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaTC += "<time datetime='"+listCapacitaciones[pos][7]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Cursos u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][19];
							itemsListaAgendaTC += "<span class='u-block'>"+listCapacitaciones[pos][18]+"</span>";
							itemsListaAgendaTC += "</time>";
							itemsListaAgendaTC += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaTC += "<div>";
							itemsListaAgendaTC += "<h4 class='CursosNoticias-TitleList u-efecto'>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][1];
							itemsListaAgendaTC += "</h4>";
							itemsListaAgendaTC += "<p>";
							itemsListaAgendaTC += ""+listCapacitaciones[pos][10];
							itemsListaAgendaTC += "</p>";
							itemsListaAgendaTC += "</div>";
							itemsListaAgendaTC += "</div>";
							itemsListaAgendaTC += "</a>";
							itemsListaAgendaTC += "</li>";
						}
					}				
					
				}

				if(listCapacitacionesAgenda.length>0)
					itemsListaAgendaTC += "</ul>";
				
				jQuery(".Agenta-ListTotalCapacitaciones").html(itemsListaAgendaTC);







				jQuery(".Agenta-ListTotalCitas").html("");
				mesAct="";

				itemsListaAgendaT = "";
				banCitasAgenda = false;

				//alert(listAgendaTotal.length);


				for(var a=0; a < listAgendaTotal.length; a++){

					if(listAgendaTotal[a][1] == 3){

						banCitasAgenda = true;
	
						var pos = buscarPosicionAgenda(listAgendaTotal[a][0]);
						var posAs=-1;

						if(listAgendaG[pos][2]!=4)
							posAs = buscarPosicionAsociado(listAgendaG[pos][13]);
	
						if(a==0)
						{
							mesAct = listAgendaG[pos][12];
	
							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listAgendaG[pos][9];
							itemsListaAgendaT += "</h3>";
	
							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList  u-inline-block u-efecto'>";
							itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Citas u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listAgendaG[pos][8];
							itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
							if(listAgendaG[pos][2]==4)
								itemsListaAgendaT += ""+listAgendaG[pos][12];
							else
								itemsListaAgendaT += ""+listAsociados[posAs][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listAgendaG[pos][4];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";	
						}
						else{
							if(mesAct == listAgendaG[pos][12]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList u-inline-block u-efecto'>";
								itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Citas u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listAgendaG[pos][8];
								itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								if(listAgendaG[pos][2]==4)
									itemsListaAgendaT += ""+listAgendaG[pos][12];
								else
									itemsListaAgendaT += ""+listAsociados[posAs][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listAgendaG[pos][4];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";				
							}
							else{
								mesAct = listAgendaG[pos][12];
	
								itemsListaAgendaT += "</ul>";
	
								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listAgendaG[pos][12];
								itemsListaAgendaT += "</h3>";
		
								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosCitas' onclick='datosCita("+pos+");' class='CursosNoticias-LinkList  u-inline-block u-efecto'>";
								itemsListaAgendaT += "<time datetime='"+listAgendaG[pos][6]+"' class='CursosNoticias-FechaList CursosNoticias-FechaList--Citas u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listAgendaG[pos][8];
								itemsListaAgendaT += "<span class='u-block'>"+listAgendaG[pos][12]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
								if(listAgendaG[pos][2]==4)
									itemsListaAgendaT += ""+listAgendaG[pos][12];
								else
									itemsListaAgendaT += ""+listAsociados[posAs][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listAgendaG[pos][4];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";
							}
						}
					}
				}

				if(banCitasAgenda)
					itemsListaAgendaT += "</ul>";
				
				jQuery(".Agenta-ListTotalCitas").html(itemsListaAgendaT);



				

				jQuery(".Agenta-ListTotalMensajes").html("");
				mesAct="";

				itemsListaAgendaT = "";
				banMensajesAgenda = false;

				//alert(listAgendaTotal.length);


				for(var a=0; a < listAgendaTotal.length; a++){


					if(listAgendaTotal[a][1] == 4){

						banMensajesAgenda = true;
						var pos = buscarPosicionMensaje(listAgendaTotal[a][0]);
												
						if(a==0)
						{
							mesAct = listMensajeG[pos][7];
	
							itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
							itemsListaAgendaT += ""+listMensajeG[pos][7];
							itemsListaAgendaT += "</h3>";
	
							itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
							itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
							itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
							itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
							itemsListaAgendaT += ""+listMensajeG[pos][4];
							itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
							itemsListaAgendaT += "</time>";
							itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
							itemsListaAgendaT += "<div>";
							itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
							itemsListaAgendaT += ""+listMensajeG[pos][1];
							itemsListaAgendaT += "</h4>";
							itemsListaAgendaT += "<p>";
							itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
							itemsListaAgendaT += "</p>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</div>";
							itemsListaAgendaT += "</a>";
							itemsListaAgendaT += "</li>";											
						}
						else{
							if(mesAct == listMensajeG[pos][7]){
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][4];
								itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";				
							}
							else{
								mesAct = listMensajeG[pos][7];
	
								itemsListaAgendaT += "</ul>";
	
								itemsListaAgendaT += "<h3 class='Agenda-TitleMes'>";
								itemsListaAgendaT += ""+listMensajeG[pos][7];
								itemsListaAgendaT += "</h3>";
		
								itemsListaAgendaT += "<ul class='CursosNoticias-List'>";
								itemsListaAgendaT += "<li class='CursosNoticias-ItemList'>";
								itemsListaAgendaT += "<a href='#DatosMensaje' onclick='datosMensaje("+pos+");' class='CursosNoticias-LinkList u-inline-block'>";
								itemsListaAgendaT += "<time datetime='"+listMensajeG[pos][3]+"' class='CursosNoticias-FechaList u-inline-block u-textCenter u-efecto'>";
								itemsListaAgendaT += ""+listMensajeG[pos][4];
								itemsListaAgendaT += "<span class='u-block'>"+listMensajeG[pos][7]+"</span>";
								itemsListaAgendaT += "</time>";
								itemsListaAgendaT += "<div class='CursosNoticias-InfoList u-inline-block'>";
								itemsListaAgendaT += "<div>";
								itemsListaAgendaT += "<h4 class='CursosNoticias-TitleList u-efecto'>";							
								itemsListaAgendaT += ""+listMensajeG[pos][1];
								itemsListaAgendaT += "</h4>";
								itemsListaAgendaT += "<p>";
								itemsListaAgendaT += ""+listMensajeG[pos][4]+"/"+listMensajeG[pos][5]+"/"+listMensajeG[pos][6];
								itemsListaAgendaT += "</p>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</div>";
								itemsListaAgendaT += "</a>";
								itemsListaAgendaT += "</li>";
							}
						}
					}
				}

				if(banMensajesAgenda)
					itemsListaAgendaT += "</ul>";
				
				jQuery(".Agenta-ListTotalMensajes").html(itemsListaAgendaT);

			}

			function cargarNotificaciones(){
				
				var listNotificacionesTotal = new Array();

				var j=0;

				for(m=0; m < listEventos.length; m++){
					
					if(listEventos[m][30]==0){
						listNotificacionesTotal[j] = new Array();

						listNotificacionesTotal[j][0] = listEventos[m][0];
						listNotificacionesTotal[j][1] = 1;
						listNotificacionesTotal[j][2] = listEventos[m][8];

						j++;
					}
				}

				for(var a=0; a < listEntradas.length; a++){
					if(listEntradas[a][8]==0 && listEntradas[a][5]==1){
						listNotificacionesTotal[j] = new Array();

						listNotificacionesTotal[j][0] = listEntradas[a][0];
						listNotificacionesTotal[j][1] = 2;
						listNotificacionesTotal[j][2] = listEntradas[a][9];

						j++;
					}
				}

				
				listAgendaG = datosUsuario[6];


				for(var a=0; a < listAgendaG.length; a++){
					if(listAgendaG[a][11]==0){
						listNotificacionesTotal[j] = new Array();

						listNotificacionesTotal[j][0] = listAgendaG[a][0];
						listNotificacionesTotal[j][1] = 3;
						listNotificacionesTotal[j][2] = listAgendaG[a][6];

						j++;
					}
				}
				
				listNotificacionesTotal.orderByString(2,-1);


				jQuery(".PerFil-TotalPostItemList").eq(0).html(""+listNotificacionesTotal.length);

				//console.log(listNotificacionesTotal);


				jQuery(".Notificaciones-ListTotal").html("");
				var diaAct="";

				var itemsListaNotificacion = "";
				var banEventoNotificacion = false;
				var banBoletinNotificacion = false;
				var banAgendaNotificacion = false;


				for(var a=0; a < listNotificacionesTotal.length; a++){

					if(listNotificacionesTotal[a][1] == 1){

						banEventoNotificacion = true;

						var pos = buscarPosicionEvento(listNotificacionesTotal[a][0]);

						if(a==0)
						{
							diaAct = listEventos[pos][20];

							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listEventos[pos][20]+" de "+listEventos[pos][19];
							itemsListaNotificacion += "</h3>";

							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
							itemsListaNotificacion += "</time>";
							itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";
						}
						else{
							if(diaAct == listEventos[pos][20]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
							else{
								diaAct = listEventos[pos][20];

								itemsListaNotificacion += "</ul>";

								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listEventos[pos][20]+" de "+listEventos[pos][19];
								itemsListaNotificacion += "</h3>";

								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
						}
					}
					
					else if(listNotificacionesTotal[a][1] == 2){

						banBoletinNotificacion = true;
	
						var pos = buscarPosicionEntrada(listNotificacionesTotal[a][0]);
	
						if(a==0)
						{
							diaAct = listEntradas[pos][10];
	
							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listEntradas[pos][10]+" de "+listEntradas[pos][11];
							itemsListaNotificacion += "</h3>";
	
							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
							itemsListaNotificacion += "</time>";
							itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";			
						}
						else{
							if(diaAct == listEntradas[pos][10]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
							else{
								diaAct = listEntradas[pos][10];
	
								itemsListaNotificacion += "</ul>";
	
								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listEntradas[pos][10]+" de "+listEntradas[pos][11];
								itemsListaNotificacion += "</h3>";
		
								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
						}
					}

					else if(listNotificacionesTotal[a][1] == 3){

						banAgendaNotificacion = true;
	
						var pos = buscarPosicionAgenda(listNotificacionesTotal[a][0]);
						var posAs=-1;

						if(listAgendaG[pos][2]!=4)
							posAs = buscarPosicionAsociado(listAgendaG[pos][13]);

						//alert(posAs+"---"+listAgendaG[pos][3]);

						if(a==0)
						{
							diaAct = listAgendaG[pos][8];
	
							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listAgendaG[pos][8]+" de "+listAgendaG[pos][12];
							itemsListaNotificacion += "</h3>";
	
							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
							
							if(listAgendaG[pos][2]==4)
								itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
							else
								itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

							itemsListaNotificacion += "</figure>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
							itemsListaNotificacion += "</time>";
							if(listAgendaG[pos][2]==4)
								itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
							else
								itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";


							console.log(itemsListaNotificacion);

						}
						else{
							if(diaAct == listAgendaG[pos][8]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
								
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
								else
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

								itemsListaNotificacion += "</figure>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
								itemsListaNotificacion += "</time>";
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
								else
									itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
							else{
								diaAct = listAgendaG[pos][8];
	
								itemsListaNotificacion += "</ul>";
	
								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" de "+listAgendaG[pos][12];
								itemsListaNotificacion += "</h3>";
		
								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
								
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
								else
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

								itemsListaNotificacion += "</figure>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
								itemsListaNotificacion += "</time>";
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
								else
									itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
						}
					}
				}

				if(banEventoNotificacion || banBoletinNotificacion || banAgendaNotificacion)
					itemsListaNotificacion += "</ul>";
				
				jQuery(".Notificaciones-ListTotal").html(itemsListaNotificacion);



				jQuery(".Notificaciones-ListTotalEventos").html("");
				var diaAct="";

				itemsListaNotificacion = "";
				banEventoNotificacion = false;
				

				for(var a=0; a < listNotificacionesTotal.length; a++){

					if(listNotificacionesTotal[a][1] == 1){

						banEventoNotificacion = true;

						var pos = buscarPosicionEvento(listNotificacionesTotal[a][0]);

						if(a==0)
						{
							diaAct = listEventos[pos][20];

							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listEventos[pos][20]+" de "+listEventos[pos][19];
							itemsListaNotificacion += "</h3>";

							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
							itemsListaNotificacion += "</time>";
							itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";
						}
						else{
							if(diaAct == listEventos[pos][20]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
							else{
								diaAct = listEventos[pos][20];

								itemsListaNotificacion += "</ul>";

								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listEventos[pos][20]+" de "+listEventos[pos][19];
								itemsListaNotificacion += "</h3>";

								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#EventoNoticia' transition='fade' onclick='datosEvento("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoCursos u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEventos[pos][8]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEventos[pos][20]+" / "+listEventos[pos][19]+" / "+listEventos[pos][18];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>Próximo "+listEventos[pos][24]+" “"+listEventos[pos][1]+"”</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
						}
					}
				}

				if(banEventoNotificacion)
					itemsListaNotificacion += "</ul>";
				
				jQuery(".Notificaciones-ListTotalEventos").html(itemsListaNotificacion);


				jQuery(".Notificaciones-ListTotalBoletines").html("");
				diaAct="";

				itemsListaNotificacion = "";
				banBoletinNotificacion = false;
				
				for(var a=0; a < listNotificacionesTotal.length; a++){

					if(listNotificacionesTotal[a][1] == 2){

						banBoletinNotificacion = true;
	
						var pos = buscarPosicionEntrada(listNotificacionesTotal[a][0]);
	
						if(a==0)
						{
							diaAct = listEntradas[pos][10];
	
							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listEntradas[pos][10]+" de "+listEntradas[pos][11];
							itemsListaNotificacion += "</h3>";
	
							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
							itemsListaNotificacion += "</time>";
							itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";			
						}
						else{
							if(diaAct == listEntradas[pos][10]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
							else{
								diaAct = listEntradas[pos][10];
	
								itemsListaNotificacion += "</ul>";
	
								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listEntradas[pos][10]+" de "+listEntradas[pos][11];
								itemsListaNotificacion += "</h3>";
		
								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#PostNoticia' transition='fade' onclick='datosBoletin("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<span class='Notificaciones-IcoItemList icon-icoBoletin u-inline-block u-redondeadoTotal u-textCenter'></span>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listEntradas[pos][9]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listEntradas[pos][10]+" / "+listEntradas[pos][11]+" / "+listEntradas[pos][12];
								itemsListaNotificacion += "</time>";
								itemsListaNotificacion += "<p><strong>¡Lee aquí nuestro boletín "+listEntradas[pos][1]+"!</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
						}
					}
				}

				if(banBoletinNotificacion)
					itemsListaNotificacion += "</ul>";
				
				jQuery(".Notificaciones-ListTotalBoletines").html(itemsListaNotificacion);


				jQuery(".Notificaciones-ListTotalCitas").html("");
				diaAct="";

				itemsListaNotificacion = "";
				banAgendaNotificacion = false;


				for(var a=0; a < listNotificacionesTotal.length; a++){

					if(listNotificacionesTotal[a][1] == 3){

						banAgendaNotificacion = true;
	
						var pos = buscarPosicionAgenda(listNotificacionesTotal[a][0]);
						var posAs=-1;

						if(listAgendaG[pos][2]!=4)
							posAs = buscarPosicionAsociado(listAgendaG[pos][13]);

						//alert(posAs+"---"+listAgendaG[pos][3]);

						if(a==0)
						{
							diaAct = listAgendaG[pos][8];
	
							itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
							itemsListaNotificacion += listAgendaG[pos][8]+" de "+listAgendaG[pos][12];
							itemsListaNotificacion += "</h3>";
	
							itemsListaNotificacion += "<ul class='Notificaciones-List'>";
							itemsListaNotificacion += "<li>";
							itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
							itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
							
							if(listAgendaG[pos][2]==4)
								itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
							else
								itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

							itemsListaNotificacion += "</figure>";
							itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
							itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
							itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
							itemsListaNotificacion += "</time>";
							if(listAgendaG[pos][2]==4)
								itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
							else
								itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
							itemsListaNotificacion += "</div>";
							itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
							itemsListaNotificacion += "</a>";
							itemsListaNotificacion += "</li>";
						}
						else{
							if(diaAct == listAgendaG[pos][8]){
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
								
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
								else
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

								itemsListaNotificacion += "</figure>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
								itemsListaNotificacion += "</time>";
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
								else
									itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";	
							}
							else{
								diaAct = listAgendaG[pos][8];
	
								itemsListaNotificacion += "</ul>";
	
								itemsListaNotificacion += "<h3 class='Agenda-TitleMes'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" de "+listAgendaG[pos][12];
								itemsListaNotificacion += "</h3>";
		
								itemsListaNotificacion += "<ul class='Notificaciones-List'>";
								itemsListaNotificacion += "<li>";
								itemsListaNotificacion += "<a href='#InteriorNotificacion' transition='fade' onclick='datosSolicitud("+pos+");' class='Notificaciones-ItemList u-inline-block u-redondeado--04'>";
								itemsListaNotificacion += "<figure class='Notificaciones-ImgItemList u-inline-block'>";
								
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>";
								else
									itemsListaNotificacion += "<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>";

								itemsListaNotificacion += "</figure>";
								itemsListaNotificacion += "<div class='Notificaciones-InfoItemList u-inline-block'>";
								itemsListaNotificacion += "<time datetime='"+listAgendaG[pos][6]+"' class='Notificaciones-FechaItemList u-blok'>";
								itemsListaNotificacion += listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10];
								itemsListaNotificacion += "</time>";
								if(listAgendaG[pos][2]==4)
									itemsListaNotificacion += "<p><strong>"+listAgendaG[pos][13]+" desea contactar contigo</strong></p>";
								else
									itemsListaNotificacion += "<p><strong>"+listAsociados[posAs][1]+" desea contactar contigo</strong></p>";
								itemsListaNotificacion += "</div>";
								itemsListaNotificacion += "<span class='Notificaciones-NextItemList u-inline-block icon-icoNext'></span>";
								itemsListaNotificacion += "</a>";
								itemsListaNotificacion += "</li>";
							}
						}
					}
				}

				if(banAgendaNotificacion)
					itemsListaNotificacion += "</ul>";

				jQuery(".Notificaciones-ListTotalCitas").html(itemsListaNotificacion);

			}

			function datosSolicitud(pos){

				if(listAgendaG[pos][2]!=4)
					var posAs = buscarPosicionAsociado(listAgendaG[pos][13]);

				
				jQuery("#InteriorNotificacion .InteriorNotificaciones-Fecha").html(listAgendaG[pos][8]+" / "+listAgendaG[pos][9]+" / "+listAgendaG[pos][10]);

				if(listAgendaG[pos][2]==4){
					jQuery("#InteriorNotificacion .InteriorNotificaciones-Foto").html("<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>");
					jQuery("#InteriorNotificacion .InteriorNotificaciones-Nombre").html(listAgendaG[pos][13]+" desea contactar contigo");
				}
					
				else{
					jQuery("#InteriorNotificacion .InteriorNotificaciones-Foto").html("<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>");
					jQuery("#InteriorNotificacion .InteriorNotificaciones-Nombre").html(listAsociados[posAs][1]+" desea contactar contigo");
				}
				
				jQuery("#InteriorNotificacion .InteriorNotificaciones-Asunto").html("<strong>Asunto:</strong> "+listAgendaG[pos][4]);

				jQuery("#InteriorNotificacion .InteriorNotificaciones-Txt").html(listAgendaG[pos][5]);

				jQuery("#InteriorNotificacion .InteriorNotificaciones-HoraFecha").html(listAgendaG[pos][8]+" de "+listAgendaG[pos][9]+" de "+listAgendaG[pos][10]+" a las "+listAgendaG[pos][7]);

				jQuery("#hdIdAgenda").val(listAgendaG[pos][0]);
			}	


			function datosCita(pos){

				if(listAgendaG[pos][2]!=4)
					var posAs = buscarPosicionAsociado(listAgendaG[pos][13]);

				
				jQuery("#DatosCitas .InteriorNotificaciones-Asunto").html("<strong>Asunto:</strong> "+listAgendaG[pos][4]);
				jQuery("#DatosCitas .InteriorNotificaciones-Txt").html(listAgendaG[pos][5]);
				jQuery("#DatosCitas .InteriorNotificaciones-HoraFecha").html(listAgendaG[pos][8]+" de "+listAgendaG[pos][9]+" de "+listAgendaG[pos][10]+" a las "+listAgendaG[pos][7]);

			
				if(listAgendaG[pos][2]==4){
					jQuery("#DatosCitas .InteriorNotificaciones-Foto").html("<img class='u-redondeadoTotal u-efecto' src='images/avataras/sinFotoPerfil.jpg' alt='Avatar'>");
					jQuery("#DatosCitas .InteriorNotificaciones-Nombre").html(listAgendaG[pos][13]);
				}
					
				else{
					jQuery("#DatosCitas .InteriorNotificaciones-Foto").html("<img class='u-redondeadoTotal u-efecto' src='"+urlBaseAsociado+listAsociados[posAs][7]+"' alt='Avatar'>");
					jQuery("#DatosCitas .InteriorNotificaciones-Nombre").html(listAsociados[posAs][1]);
				}
				
				jQuery("#DatosCitas .DatosCitas-Telefono").html("Teléfono: <a onclick=\"document.location.href = 'tel:+"+listAsociados[posAs][8]+"';\" target='_blank'><strong>"+listAsociados[posAs][8]+"</strong></a>");
				jQuery("#DatosCitas .DatosCitas-Email").html("E-mail: <a onclick=\"document.location.href = 'mailto:"+listAsociados[posAs][9]+"'\" target='_blank'><strong>"+listAsociados[posAs][9]+"</strong></a>");
			}

			function datosMensaje(pos){
				jQuery("#DatosMensaje .InteriorNotificaciones-Asunto").html("<strong>Asunto:</strong> "+listMensajeG[pos][1]);
				jQuery("#DatosMensaje .InteriorNotificaciones-Txt").html(listMensajeG[pos][2]);
				jQuery("#DatosMensaje .InteriorNotificaciones-HoraFecha").html(listMensajeG[pos][4]+" de "+listMensajeG[pos][5]+" de "+listMensajeG[pos][6]);
			}

			function cargarContenidos() 
			{
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/listaDeContenidosApp.php",
					url: "http://villahermosa.ampiserver.net/ajax/listaDeContenidosApp.php",						
					data	:{},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						listContenidos = Respuesta;	
						
						for(var j=0; j < listContenidos.length; j++)
						{
							if(j==0) {
								jQuery(".Historia .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Historia'>");
								jQuery(".Historia .CursoNoticia-Title").html(""+listContenidos[j][1]);
								jQuery(".Historia .CursoNoticia-Text").html(""+listContenidos[j][3]);
							}
							else if(j==1){
								jQuery(".Expresidentes .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Expresidentes'>");
								jQuery(".Expresidentes .CursoNoticia-Title").html(""+listContenidos[j][1]);

								var listExpresidentes = new Array();
								listExpresidentes = listContenidos[j][4];
 
								jQuery(".Expresidentes .Ampi-ListExpresidentes").html("");
								var itemExpresidente = "";

								for(var a=0; a < listExpresidentes.length; a++){

									itemExpresidente += "<li>";
									itemExpresidente += "<figure class='u-inline-block'>";
									itemExpresidente += "<img class='u-redondeadoTotal' src='"+urlBaseContenido+"expresidentes/"+listExpresidentes[a][2]+"' alt='Expresidente'>";
									itemExpresidente += "</figure>";
									itemExpresidente += "<div class='u-inline-block'>";
									itemExpresidente += "<h3>"+listExpresidentes[a][0]+"</h3>";
									itemExpresidente += "<span>"+listExpresidentes[a][1]+"</span>";
									itemExpresidente += "</div>";
									itemExpresidente += "</li>";
								}
								jQuery(".Expresidentes .Ampi-ListExpresidentes").html(itemExpresidente);
							}
							else if(j==2){
								jQuery(".Organigrama .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Organigrama'>");
								jQuery(".Organigrama .CursoNoticia-Title").html(""+listContenidos[j][1]);
								jQuery(".Organigrama .CursoNoticia-Text").html(""+listContenidos[j][3]);
							}
							else if(j==3){
								jQuery(".Directorio .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Directorio'>");
								jQuery(".Directorio .CursoNoticia-Title").html(""+listContenidos[j][1]);

								var listDirectorios = new Array();
								listDirectorios = listContenidos[j][4];
 
								jQuery(".Directorio .Ampi-ListExpresidentes").html("");
								var itemDirectorio = "";

								for(var a=0; a < listDirectorios.length; a++){

									itemDirectorio += "<li>";
									itemDirectorio += "<figure class='u-inline-block'>";
									itemDirectorio += "<img class='u-redondeadoTotal' src='"+urlBaseContenido+"directorio/"+listDirectorios[a][2]+"' alt='Directorio'>";
									itemDirectorio += "</figure>";
									itemDirectorio += "<div class='u-inline-block'>";
									itemDirectorio += "<h3>"+listDirectorios[a][0]+"</h3>";
									itemDirectorio += "<span>"+listDirectorios[a][1]+"</span>";
									itemDirectorio += "</div>";
									itemDirectorio += "</li>";
								}
								jQuery(".Directorio .Ampi-ListExpresidentes").html(itemDirectorio);
							}
							else if(j==4){
								jQuery(".Filosofia .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Filosofia'>");
								jQuery(".Filosofia .CursoNoticia-Title").html(""+listContenidos[j][1]);
								jQuery(".Filosofia .CursoNoticia-Text").html(""+listContenidos[j][3]);
							}
							else if(j==5){
								jQuery(".Beneficios .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Beneficios'>");
								jQuery(".Beneficios .CursoNoticia-Title").html(""+listContenidos[j][1]);
								jQuery(".Beneficios .Ampi-DatosBeneficios").html(""+listContenidos[j][3]);
							}
							else if(j==6){
								jQuery(".Documentos .CursoNoticia-Img").html("<img src='"+urlBaseContenido+listContenidos[j][2]+"' alt='Documentos'>");
								jQuery(".Documentos .CursoNoticia-Title").html(""+listContenidos[j][1]);

								var listDocumentos = new Array();
								listDocumentos = listContenidos[j][4];
 
								jQuery(".Documentos .Ampi-ListBeneficios--Documentos").html("");
								var itemDocumento = "";

								for(var a=0; a < listDocumentos.length; a++){

									itemDocumento += "<li>";
									itemDocumento += "<a onclick=\"window.open('"+urlBaseContenidoDocumento+listDocumentos[a][2]+"','_system','location=yes');\" class='Ampi-ItemListBeneficio u-block' target='_blank'>";								
									itemDocumento += "<span class='Ampi-IcoListDocumentos icon-icoBoletin u-inline-block'></span>";
									itemDocumento += "<p class='u-inline-block'>"+listDocumentos[a][0]+"</p>";
									itemDocumento += "</a>";
									itemDocumento += "</li>";
								}
								jQuery(".Documentos .Ampi-ListBeneficios--Documentos").html(itemDocumento);
							}
						}
					}		
				});		
			}

			function cargarDatosFormulariosPropiedades(){
				jQuery.ajax(
				{
					url: "http://villahermosa.ampiserver.net/ajax/listaDeDatosPropiedadesApp.php",						
					data	:{},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						var listDatos = new Array();
							
						listDatos = Respuesta;	
							
						for(var j=0; j < listDatos.length; j++)
						{
							if(j==0) {
								var listTiposPropiedades = new Array();
								listTiposPropiedades = listDatos[j];
								
								jQuery(".FiltrosPropiedades-ListTipos").html("");

								var itemTipoPropiedadF = "";

								for(var a=0; a < listTiposPropiedades.length; a++){
									itemTipoPropiedadF += "<li class='FiltrosPropiedades-ColTipo1 u-inline-block'>";
									itemTipoPropiedadF += "<input name='rdTipo' id='rdTipo"+a+"' type='radio' value='"+listTiposPropiedades[a][0]+"'>";
									itemTipoPropiedadF += "<label class='lbRadio2' for='rdTipo"+a+"'>"+listTiposPropiedades[a][1]+"</label>";
									itemTipoPropiedadF += "</li>";

									jQuery("#stTipoPropiedadNP").append("<option value='"+listTiposPropiedades[a][0]+"'>"+listTiposPropiedades[a][1]+"</option>");
									jQuery("#stTipoPropiedadEP").append("<option value='"+listTiposPropiedades[a][0]+"'>"+listTiposPropiedades[a][1]+"</option>");
								}

								jQuery(".FiltrosPropiedades-ListTipos").html(itemTipoPropiedadF);
							}
							else if(j==1) {
								var listCaracteristicasPropiedades = new Array();
								listCaracteristicasPropiedades = listDatos[j];

								listCaracteristicasPropiedadesE = listDatos[j];

								jQuery(".FiltrosPropiedades-ListCaracteristicas").eq(1).html("");
								jQuery(".NuevaPropiedad-List").eq(2).html("");

								var itemCaracteristicaPropiedadF = "";
								var itemCaracteristicaPropiedadN = "";
	 
								for(var a=0; a < listCaracteristicasPropiedades.length; a++){
									itemCaracteristicaPropiedadF += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
									itemCaracteristicaPropiedadF += "<input name='cbCaracteristica"+a+"' id='cbCaracteristica"+a+"' type='checkbox' value='"+listCaracteristicasPropiedades[a][0]+"'>";
									itemCaracteristicaPropiedadF += "<label class='lbCheckbox' for='cbCaracteristica"+a+"'>"+listCaracteristicasPropiedades[a][1]+"</label>	";
									itemCaracteristicaPropiedadF += "</li>";


									itemCaracteristicaPropiedadN += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
									itemCaracteristicaPropiedadN += "<input name='cbCaracteristicaNP"+a+"' id='cbCaracteristicaNP"+a+"' type='checkbox' value='"+listCaracteristicasPropiedades[a][0]+"'>";
									itemCaracteristicaPropiedadN += "<label class='lbCheckbox' for='cbCaracteristicaNP"+a+"'>"+listCaracteristicasPropiedades[a][1]+"</label>	";
									itemCaracteristicaPropiedadN += "</li>";
								}

								jQuery("#num_caracteristicaNP").val(listCaracteristicasPropiedades.length);
								jQuery(".FiltrosPropiedades-ListCaracteristicas").eq(1).html(itemCaracteristicaPropiedadF);
								//jQuery(".NuevaPropiedad-List").eq(2).html(itemCaracteristicaPropiedadN);
							}
							else if(j==2) {
							/*	var listZonasPropiedades = new Array();
								listZonasPropiedades = listDatos[j];

								jQuery(".FiltrosPropiedades-ListZonas").html("");
								jQuery(".NuevaPropiedad-List").eq(0).html("");

								var itemZonaPropiedadF = "";
								var itemZonaPropiedadN = "";
	 
								for(var a=0; a < listZonasPropiedades.length; a++){
									if(a==0){
										itemZonaPropiedadF += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
										itemZonaPropiedadF += "<input name='rbZona' id='rbZona"+a+"' type='radio' value='"+listZonasPropiedades[a][0]+"'>";
										itemZonaPropiedadF += "<label class='lbRadio' for='rbZona"+a+"'>"+listZonasPropiedades[a][1]+"</label>";
										itemZonaPropiedadF += "</li>";

										itemZonaPropiedadN += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
										itemZonaPropiedadN += "<input checked name='rbZonaNP' id='rbZonaNP"+a+"' type='radio' value='"+listZonasPropiedades[a][0]+"'>";
										itemZonaPropiedadN += "<label class='lbRadio' for='rbZonaNP"+a+"'>"+listZonasPropiedades[a][1]+"</label>";
										itemZonaPropiedadN += "</li>";
									}
									else{
										itemZonaPropiedadF += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
										itemZonaPropiedadF += "<input name='rbZona' id='rbZona"+a+"' type='radio' value='"+listZonasPropiedades[a][0]+"'>";
										itemZonaPropiedadF += "<label class='lbRadio' for='rbZona"+a+"'>"+listZonasPropiedades[a][1]+"</label>";
										itemZonaPropiedadF += "</li>";

										itemZonaPropiedadN += "<li class='FiltrosPropiedades-ColCheckbox u-inline-block'>";
										itemZonaPropiedadN += "<input name='rbZonaNP' id='rbZonaNP"+a+"' type='radio' value='"+listZonasPropiedades[a][0]+"'>";
										itemZonaPropiedadN += "<label class='lbRadio' for='rbZonaNP"+a+"'>"+listZonasPropiedades[a][1]+"</label>";
										itemZonaPropiedadN += "</li>";
									}									
								}

								jQuery(".FiltrosPropiedades-ListZonas").html(itemZonaPropiedadF);
								//jQuery(".NuevaPropiedad-List").eq(0).html(itemZonaPropiedadN);*/
							}		
							else if(j==3){
								listCostosMembresias = listDatos[j];

								jQuery("#CostoRenovacion").html("<strong>Costo de membresía:</strong> $"+listCostosMembresias[0][1]);
							}	
							else if(j==4){
								var listMunicipios = new Array();
								listMunicipios = listDatos[j];
 
								for(var a=0; a < listMunicipios.length; a++){
									jQuery("#stMunicipiosNP,#stMunicipiosEP,#stMunicipiosFP").append("<option value='"+listMunicipios[a][0]+"'>"+listMunicipios[a][1]+"</option>");
								}
							}
							else if(j==5){
								var listFormasPago = new Array();
								listFormasPago = listDatos[j];
 
								for(var a=0; a < listFormasPago.length; a++){
									jQuery("#stFormaPagoTerminacionVenta").append("<option value='"+listFormasPago[a][0]+"'>"+listFormasPago[a][1]+"</option>");
								}
							}	
						}
						
						jQuery('.NuevaPropiedad-Campos .lista').trigger('update');
						jQuery('#ConcluirVenta .lista').trigger('update');

					}		
				});
			}

			function cargarDatosOptions(){
				jQuery.ajax(
				{
					//url: "http://localhost/adminAMPIVillahermosa/ajax/listaDeDatosApp.php",
					url: "http://villahermosa.ampiserver.net/ajax/listaDeDatosApp.php",						
					data	:{},
					type	: "POST",
					dataType : "json",
					async    : 	false,
					success	: function(Respuesta)
					{
						var listDatos = new Array();
						
						listDatos = Respuesta;	
						
						for(var j=0; j < listDatos.length; j++)
						{
							if(j==0) {
								var listTiposAsociado = new Array();
								listTiposAsociado = listDatos[j];
 
								for(var a=0; a < listTiposAsociado.length; a++){
									jQuery("#stTipoMembresia").append("<option value='"+listTiposAsociado[a][0]+"'>"+listTiposAsociado[a][1]+"</option>");
								}
							}
							else if(j==1) {
								var listInmobiliarias = new Array();
								listInmobiliarias = listDatos[j];
 
								for(var a=0; a < listInmobiliarias.length; a++){
									jQuery("#stInmobiliaria").append("<option value='"+listInmobiliarias[a][0]+"'>"+listInmobiliarias[a][1]+"</option>");
								}
							}
							else if(j==2) {
								var listTiposCapacitaciones = new Array();
								listTiposCapacitaciones = listDatos[j];
 
								for(var a=0; a < listTiposCapacitaciones.length; a++){
									jQuery("#stTipoCurso").append("<option value='"+listTiposCapacitaciones[a][0]+"'>"+listTiposCapacitaciones[a][1]+"</option>");
								}
							}						
						}

						jQuery('.lista').trigger('update');
					}		
				});
			}

			//Eliminar sliderPropiedad
			function eliminar_sliderPropiedad(posi,id_s)
			{
				if(confirm("¿Desea eliminar esta imagen de la propiedad?")){
					
					jQuery.ajax(
					{
						url: "http://villahermosa.ampiserver.net/ajax/eliminar_imagenPropiedadApp.php",					
						data	:
								{
									id_slider : id_s
								},
						type	: "POST",
						dataType : "html",
						async    : 	false,
						success	: function(Respuesta)
						{
							var str = jQuery('#sliderNP').val();
							var res = str.replace(","+id_s, "");
							
							if(jQuery('#sliderNP').val() == res){
								jQuery('#sliderNP').val(str.replace(id_s, ""));
							}
							else
								jQuery('#sliderNP').val(res);

							jQuery("#NuevaPropiedad .NuevaPropiedad-ListImages li").eq(posi).removeClass("u-inline-block");
							jQuery("#NuevaPropiedad .NuevaPropiedad-ListImages li").eq(posi).css({"display":"none"});
						}		
					});
				}
			}

			//Eliminar sliderEditarPropiedad
			function eliminar_sliderPropiedadE(posi,id_s)
			{
				if(confirm("¿Desea eliminar esta imagen de la propiedad?")){
					
					jQuery.ajax(
					{
						url: "http://villahermosa.ampiserver.net/ajax/eliminar_imagenPropiedadApp.php",					
						data	:
								{
									id_slider : id_s
								},
						type	: "POST",
						dataType : "html",
						async    : 	false,
						success	: function(Respuesta)
						{
							var str = jQuery('#sliderEP').val();
							var res = str.replace(","+id_s, "");
							
							if(jQuery('#sliderEP').val() == res){
								jQuery('#sliderEP').val(str.replace(id_s, ""));
							}
							else
								jQuery('#sliderEP').val(res);

							jQuery("#EditarPropiedad .NuevaPropiedad-ListImages li").eq(posi).removeClass("u-inline-block");
							jQuery("#EditarPropiedad .NuevaPropiedad-ListImages li").eq(posi).css({"display":"none"});
						}		
					});
				}
			}


			function cerrarSesion(){
				setTimeout(function(){
					location.reload();
				},3000);
			}


			/*
			//Login Facebook
			function loginWithFB(){
                facebookConnectPlugin.login(["public_profile","email"], function(result){
                    console.log(JSON.stringify(result));

                    facebookConnectPlugin.api("/me?fields=id,email,name,picture", ["public_profile","email"], function(userData){
						//alert(JSON.stringify(userData)); 
						document.location.href = "#Home";
                    },function(error) {
                        alert(JSON.stringify(error));
                    });
                },function(error) {
                    alert(JSON.stringify(error));
                });
			}
			
			//Login Google
			function gplusLogin(){
                window.plugins.googleplus.login(
                {         

                },
                function (obj) 
                {
					document.location.href = "#Home";
                    //alert(JSON.stringify(obj)); // do something useful instead of alerting
                },
                function (msg) {
                    alert('error: ' + JSON.stringify(msg));
                });
			}*/
			
			//Notificación

			/*function PushNotification(){
                if ("Notification" in window) {
                    Notification.requestPermission(function (permission) {
                        // If the user accepts, let’s create a notification
                        if (permission === 'granted') 
                        {
                            var notification = new Notification("Bienvenido", {
                                body: "Muchas gracias por utilizar nuestra APP",
                                icon: 'http://gomserver.net/logo.png',
                            }); 
                            notification.onshow  = function() { console.log('show'); };
                            notification.onclose = function() { console.log('close'); };
                            notification.onclick = function() { console.log('click'); };
                        }
                    });
                }
                else
                {
                    alert("No existe");
				}				
			}*/


			/*function PushNotification2(){     
				
				alert("Si");

				cordova.plugins.notification.local.schedule({
                    id: 1,
                    title: "Bienvenido",
                    text: "Muchas gracias por utilizar nuestra APP",
                    icon: 'http://gomserver.net/logo.png'
                });  
			}*/
			
			//Validación de campos
		  	function validar_campo(campo,cant_num, place)
 			{ 
  				var ban = true;
  
     			if(/^\s+$/.test(jQuery(campo).val()) || jQuery(campo).val().length < cant_num ||  jQuery(campo).val() == place)
	  			{
					jQuery(campo).effect('pulsate', { times:2 }, 1000);		
					jQuery(campo).focus();
					ban = false;		
	  			}
  			return ban;
 			}
			
			function validar_campoHTML(campo,contenedor,cant_num, place)
 			{ 
  				var ban = true;
  
     			if(/^\s+$/.test(jQuery(campo).val()) || jQuery(campo).val().length < cant_num ||  jQuery(campo).val() == place)
	  			{
					jQuery(contenedor).effect('pulsate', { times:2 }, 1000);		
					jQuery(contenedor).focus();
					ban = false;		
	  			}
  			return ban;
			}
					
			function validar_campoEspecial(campo,ejecutarValidacion,posicion,cant_num, place)
			{ 
				var ban = true;
	  
				if(/^\s+$/.test(jQuery(campo).val()) || jQuery(campo).val().length < cant_num ||  jQuery(campo).val() == place)
				{
					jQuery(ejecutarValidacion).eq(posicion).effect('pulsate', { times:2 }, 1000);		
					jQuery(ejecutarValidacion).eq(posicion).focus();
					ban = false;		
				}
			return ban;
			}

			function validar_campoSelect(campo,ejecutarValidacion,posicion,cant_num, place)
			{ 
				var ban = true;
	  
				if(/^\s+$/.test(jQuery(campo).val()) || jQuery(campo).val().length < cant_num ||  jQuery(campo).val() == place)
				{
					jQuery(ejecutarValidacion).eq(posicion).effect('pulsate', { times:2 }, 1000);		
					jQuery(ejecutarValidacion).eq(posicion).focus();
					ban = false;		
				}
			return ban;
			}

			 
			function archivo(evt) {
                var files = evt.target.files; // FileList object
             
            	// Obtenemos la imagen del campo "file".
                for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('image.*')) {
                        continue;
                    }
             
                    var reader = new FileReader();
             
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         document.getElementById("CompletaTuRegistro-Foto").innerHTML = ['<img src="', e.target.result,'" title="', escape(theFile.name), '"/> <figcaption>Foto de perfil</figcaption>'].join('');
                        };
                    })(f);
             
                    reader.readAsDataURL(f);
                }
			}


			function number_format(amount, decimals) {

				amount += ''; // por si pasan un numero en vez de un string
				amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
			
				decimals = decimals || 0; // por si la variable no fue fue pasada
			
				// si no es un numero o es igual a cero retorno el mismo cero
				if (isNaN(amount) || amount === 0) 
					return parseFloat(0).toFixed(decimals);
			
				// si es mayor o menor que cero retorno el valor formateado como numero
				amount = '' + amount.toFixed(decimals);
			
				var amount_parts = amount.split('.'),
					regexp = /(\d+)(\d{3})/;
			
				while (regexp.test(amount_parts[0]))
					amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
			
				return amount_parts.join('.');
			}

			Array.prototype.orderByString=function(property,sortOrder,ignoreCase)
			{
				if (sortOrder!=-1 && sortOrder!=1) sortOrder=1;
					this.sort(function(a,b)
					{
						var stringA=a[property],stringB=b[property];
						// Si un valor es null o undefined, se convierte a cadena vacÃ­a.
						if (stringA==null) stringA = '';
						if (stringB==null) stringB = '';
						// Si ignoreCase es true, se convierten ambas variables a minÃºsculas.
						if (ignoreCase==true){stringA=stringA.toLowerCase();stringB=stringB.toLowerCase()}
						var res = 0;
						if (stringA<stringB) res = -1;
						else if (stringA>stringB) res = 1;
						return res*sortOrder;
					})
			}

			function calculator(lat1h,long1h,lat2h,long2h) 
			{
				var degtorad = 0.01745329;
				var radtodeg = 57.29577951;
				var lat1 = parseFloat(lat1h);
				var lat2 = parseFloat(lat2h);
				var long1 = parseFloat(long1h);
				var long2 = parseFloat(long2h);
				if ((lat1h.lastIndexOf("S"))!=-1 || (lat1h.lastIndexOf("s"))!=-1)
				  lat1 = (lat1 * (-1));
				if ((lat1h.lastIndexOf("W"))!=-1 || (lat1h.lastIndexOf("w"))!=-1)
				  lat1 = (lat1 * (-1));
				if((lat2h.lastIndexOf("S"))!=-1 || (lat2h.lastIndexOf("s"))!=-1)
				  lat2 = (lat2 * (-1));
				if((lat2h.lastIndexOf("W")!=-1) || (lat2h.lastIndexOf("w"))!=-1)
				  lat2 = (lat2 * (-1));
				if((long1h.lastIndexOf("S")!=-1) || (long1h.lastIndexOf("s"))!=-1)
				  long1 = (long1 * (-1));
				if((long1h.lastIndexOf("W")!=-1) || (long1h.lastIndexOf("w"))!=-1)
				  long1 = (long1 * (-1));
				if((long2h.lastIndexOf("S")!=-1) || (long2h.lastIndexOf("s"))!=-1)
				  long2 = (long2 * (-1));
				if((long2h.lastIndexOf("W")!=-1) || (long2h.lastIndexOf("w"))!=-1)
				  long2 = (long2 * (-1));
				var dlong = (long1 - long2);
				var dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad))
				 + (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad)
				 * Math.cos(dlong * degtorad));
				var dd = Math.acos(dvalue) * radtodeg;
				var miles = (dd * 69.16);
				miles = (miles * 100)/100;
				var km = (dd * 111.302);
				km = (km * 100)/100;
			  
				return km;
			}