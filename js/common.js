/**
 * 文字閃爍
 * @param id   jquery selecor
 * @param arr  ['#FFFFFF','#FF0000']
 * @param s    milliseconds
 */
function toggleColor( id , arr , s ){
	var self = this;
	self._i = 0;
	self._timer = null;

	self.run = function(){
        if(arr[self._i]){
            $(id).css('color', arr[self._i]);
        }
        self._i == 0 ? self._i++ : self._i = 0;
        self._timer = setTimeout(function(){
            self.run( id , arr , s);
        }, s);
	}
	self.run();
}
/**
 * 文字閃爍2
 * @param id   jquery selecor
 * @param arr  ['#FFFFFF','#FF0000']
 * @param s    milliseconds
 * @param s object
 * ex : text-shadow(陰影 (垂直 水平 聚焦 顏色))、text-stroke(文字邊框 (邊框粗細 顏色))、transform(rotate蹺蹺板 scale縮放 skew歪斜 translate平移)
 */
function toggleColor2( id , arr , s , o){
    var self = this;
    self._i = 0;
    self._timer = null;
    self.css = '';

    self.run = function(){
        if(o != undefined){
            $.each(o, function(k, v){
                self.css = (self._i == 1) ? v : '';
                $(id).css(k, self.css);
            });
        }

        if(arr[self._i]){
            $(id).css('color', arr[self._i]);
        }
        self._i == 0 ? self._i++ : self._i = 0;
        self._timer = setTimeout(function(){
            self.run( id , arr , s);
        }, s);
    }
    self.run();
}