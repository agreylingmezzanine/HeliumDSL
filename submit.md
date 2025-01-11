  


## Description

Submit buttons are aesthetically similar to normal buttons but their behaviour differs from normal buttons with respect to the following:

  * They allow data captured on the view to be submitted to a unit
  * They do not allow for usage without an action function binding



[Visibility bindings](/wiki/spaces/HTUT/pages/5739808/visible), [Button colours and icons](/wiki/spaces/HTUT/pages/167412232/Button+colours+and+icons), [Button grouping, ](/wiki/spaces/HTUT/pages/168034458/Button+grouping)[Tooltips](/wiki/spaces/HTUT/pages/5738935/Tooltips) and the [confirm dialog](/wiki/spaces/HTUT/pages/5736566/confirm) is also supported.

  


  


## Example

**View XML**
    
    
    <textarea label="input.workout_comments">
    	<binding variable="uWorkout">
    		<attribute name="comments"/>
    	</binding>
    </textarea>
     
    <submit label="button.save_workout" action="saveWorkout"/>

**Backing unit**
    
    
    unit Workouts;
     
    Workout uWorkout;
     
    void init() {
    	uWorkout = Workout:new();
    }
     
    .
    .
    .
     
    DSL_VIEWS saveWorkout() {
    	uWorkout.endTstamp = Date:now();
    	uWorkout.save();
    	init();
    	return DSL_VIEWS.Workouts;
    }

**en.lang file entry**
    
    
    button.save_workout = Save workout

The above example shows a very typical use case where data is submitted after which the view is reloaded by means of a navigation to the same view. Note that when navigating from a view to itself, the view is reloaded in that any collection sources for widgets on the view are re-evaluated. The init function, however, will not be executed. A view init function will only be executed when navigating to the view from a different view or as a result of a menu navigation. For that reason we include a call to `init` in the `saveWorkout` function in the code snippet above. This ensures that a new workout object instance is instantiated despite the init function not being called automatically.

  


  


## Additional Mentions and References

  * Shown in code example in the Helium Tutorial [Lesson 5: Model Objects, Enums](https://wiki.mezzanineware.com/display/HTUT/Lesson+5%3A+Model+Objects%2C+Enums)
  * [Helium DSL and View Quick Reference](https://wiki.mezzanineware.com/display/HTUT/Quick+Reference#QuickReference-ViewWidgets)



  


  

