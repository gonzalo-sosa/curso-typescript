// Create a decorator for adding a sauce to Pizza instances:
@Sauce('pesto') 
class Pizza { } 

function Sauce(sauce: string) {
  return (constructor: Function) => {
    constructor.prototype.sauce = sauce;
  }
}