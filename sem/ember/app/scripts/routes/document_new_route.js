
EmberApp.DocumentNewRoute = Ember.Route.extend({

	setupController: function(controller, thisDocument) {
        console.log("Document new route controller setup");
        // test = controller;
		controller.set('model', thisDocument);
		controller.set('field', thisDocument.fields);
	},

    model: function (params) {
        console.log("Document route model method called.");
        this.fields = [
        	{
        		"setTextInput":true,
        		"setLabel":true,
        		"uniqueName":"form12-field1",
        		"name":"veld 1",
        		"fieldValue":""
        	},
        	{
        		"setTextArea":true,
        		"setLabel":true,
        		"uniqueName":"form12-field2",
        		"name":"veld 2",
        		"fieldValue":""
        	}, 
        	{
        		"setHeader3":true,
        		"fieldValue":"Kopje"
        	},
        	{
        		"setImage":true,
        		"fieldValue":"http://www.seeklogo.com/images/R/Random-logo-B2E22B770A-seeklogo.com.gif",
        		"name":"logo"
        	}
        ];

        this.name = "form";
        return this;
    },

    actions : {
        backToMenu : function() {
            this.transitionTo('/');
        },

        backToTop : function() {
            $("html, body").animate({ scrollTop : 0}, 1000);
        },

        backToList : function() {
            console.log("back to list called from new document")
            this.transitionTo('documents');
        },

        delete : function() {
            console.log("Delete called.");
            
            if (confirm("Press a button")) {
                console.log("OK pressed");
                this.transitionTo('documents');
            }
        }
    }
});


/*
                            
{{inputText 'requested-facility' '' 'Aangevraagde voorziening' 'requested-facility'}}

<article class="client-data">
    <h3>Persoonlijke gegevens cliënt:</h3>
    {{inputText 'client-name' '' 'Naam client' ''}}
    {{inputText 'client-address' '' 'Woonadres' ''}}
    {{inputText 'client-zipp-town' '' 'Postcode/woonplaats' ''}}
    {{inputText 'client-phone' '' 'Telefoon' ''}}
    {{inputText 'client-birthdate' '' 'Geboortedatum' ''}}
    {{inputText 'client-insurance' '' 'Zorgverzekering' ''}}
    {{inputText 'client-registration' '' 'Registratienummer' ''}}
    {{inputText 'client-bsn' '' 'BSN' ''}}
</article>

<article class="therapist-data">
    <h3>Gegevens ergotherapeut:</h3>
    {{inputText 'therapist-name' '' '' ''}}
    {{inputText 'therapist-company' '' '' ''}}
    {{inputText 'therapist-phone' '' 'Tel' ''}}
    {{inputText 'therapist-email' '' 'Email' ''}}
    {{inputTextArea 'therapist-freeform' '' 'Bio' ''}}
</article>

<h2>Hulpvraag</h2>
{{inputTextArea 'help-question' '' '' ''}}
<h2>Hulpvraag Analyse</h2>
{{inputTextArea 'help-question-analysis-part1' '' "Aandoeningen en stoornissen" ''}}
{{inputTextArea 'help-question-analysis-part2' '' "Mogelijkheden en beperkingen" ''}}
<h3>Omgevingsfactoren</h3>
{{inputTextArea 'environment-factors' '' '' ''}}
<h3>Participatie</h3>
{{inputTextArea 'participation' '' '' ''}}
<h3>Aanwezige voorzieningen</h3>
{{inputTextArea 'present-facilities' '' '' ''}}
<h2>Selectieproces</h2>
<h3>Keuzeproces</h3>
{{inputTextArea 'Choise process' '' '' ''}}
<h3>Programma van eisen</h3>
{{inputTextArea 'Choise process' '' '' ''}}
<h3>Advies</h3>
{{inputTextArea 'Choise process' '' '' ''}}
<h3>Bijlagen</h3>

{{inputTextArea 'Choise process' '' 'CC.' ''}}
<span>Vriendelijke groet,</span>
{{inputText 'therapist-name-footer' '' '' ''}}
{{inputText 'therapist-company-footer' '' '' ''}} */