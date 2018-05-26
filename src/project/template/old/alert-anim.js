
const animation = weex.requireModule('animation');

exports.animation = {

    /**
     * alert类型弹出框动画
     * @param ref
     */
    animation_alert:function(ref,end) {
        animation.transition(ref, {
            styles: {
                transform: 'scale(1.2)',
            },
            duration: 100,
            timingFunction: 'linear',
        }, function () {
            animation.transition(ref, {
                styles: {
                    transform: 'scale(1)',
                },
                duration: 100, 
                timingFunction: 'linear',
            }, end);
        });
    },

    animation_actionSheet:function(ref,type,distance,end) {

        var animation_style = {};
        if (type === 'bottom') {
            animation_style = {transform: 'translate(0px, -'+distance+'px)'}
        } else if (type === 'top'){
            animation_style = {transform: 'translate(0px, '+distance+'px)'}
        } else if (type === 'left'){
            animation_style = {transform: 'translate('+distance+'px, 0px)'}
        } else if (type === 'right'){
            animation_style = {transform: 'translate(-'+distance+'px, 0px)'}
        }

        animation.transition(ref, {
            styles: animation_style,
            duration: 200,
            timingFunction: 'linear',
        }, end);
    }
}