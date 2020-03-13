const COLUMN_WIDTH = 32;
const ROW_HEIGHT = 32;
class Plotter{
    static plotX(column,row){
        return column * COLUMN_WIDTH;
    }
    static plotY(column,row){
        return row * ROW_HEIGHT;
    }
}