$(document).ready(function () {
    function Dialogue(isYou, text, emote, responses, wait = 2) {
        this.isYou = isYou;
        this.text = text;
        this.emote = emote;
        this.wait = wait;
        this.responses = responses;
    }

    Dialogue.prototype.blockText = function () {
        let $block = $('<li>').html(this.text);
        this.isYou ? $block.addClass('you') : $block.addClass('them');
        return $block;
    }

    const allDialogue = [];
    allDialogue.push(
        /* 0 */ new Dialogue(false, "I know that can’t have been easy for you.", 'sad', [1, 2, 3]),
        /* 1 */ new Dialogue(true, "Easy!? It was hell!", 'angry', [4]),
        /* 2 */ new Dialogue(true, "I survived.", 'normal', [5]),
        /* 3 */ new Dialogue(true, "...", 'normal', [4]),
        /* 4 */ new Dialogue(false, "I thought-<br/>I thought you'd get away.<br/>'" +
            "If'd known you'd be imprisoned...", 'normal', [6, 7]),
        /* 5 */ new Dialogue(false, "I'm glad.<br/>" + 
            "I know you don’t want to hear it, but I really-<br/>" + 
            "<span class='act'>SIGH</span><br/>" + 
            "I really thought… I had to sacrifice something. To prove myself. To prove I’m not selfish.",
            'normal', []),
        /* 6 */ new Dialogue(true, "I'm not upset about doing time, Arjana.", 'normal', []),
        /* 7 */ new Dialogue(true, "Maybe think a little harder next time.", 'normal', []),
    );

    Dialogue.prototype.showResponses = function() {
        let $choiceDiv = $('<div>');
        for(let i = 0; i < this.responses.length; i++) {
            let index = this.responses[i];
            $choiceDiv.append(
                allDialogue[index].blockText().attr('data-index', index)
            );
        }
        return $choiceDiv;
    }
    
    let currentDialogue = allDialogue[0];
    $('#choices').html(currentDialogue.showResponses().html());

    $('#choices').on('click', 'li', function() {
        $(this).prependTo($('#convo-record'));
        $('#choices').empty();
        let response = allDialogue[ allDialogue[$(this).attr('data-index')].responses[0] ];
        response.blockText().prependTo($('#convo-record'));
        $('#choices').html(response.showResponses().html());
    });
    
});