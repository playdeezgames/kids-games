class Utility{
    static copy(source){
        return JSON.parse(JSON.stringify(source));
    }
    static clamp(minimum, maximum, value){
        if(value<minimum){
            return minimum;
        }else if(value>maximum){
            return maximum;
        }else{
            return value;
        }
    }
}