from django.urls import path
from Home.views import UserLoginView,AddUsertoBoard,AddTaskView,AddBoardView,BoardDetailsView,PeopleView,UserSignupView,UserDashboardView,ChangeTaskStatusView,AssignTaskView


urlpatterns = [
    path("",UserSignupView.as_view()), #for signup page 
    path("<str:user_name>",UserLoginView.as_view()), #for login page 
    path("<str:user_name>/dashboard",UserDashboardView.as_view()), #displaying dashboard which contain all the boards 
    path("<str:user_name>/<int:board_id>",AddUsertoBoard.as_view()), #add user to board
    path("<str:user_name>/<int:board_id>/addtask",AddTaskView.as_view()), #add task to board
    path("<str:user_name>/addboard",AddBoardView.as_view()), #add new board
    path("<str:user_name>/<int:board_id>/board_details",BoardDetailsView.as_view()), #display board tasks
    path("<str:user_name>/<int:board_id>/people",PeopleView.as_view()), #display peoples on particular board
    path("<str:user_name>/<int:board_id>/<int:task_id>/setstatus",ChangeTaskStatusView.as_view()), #changing status of task
    path("<str:user_name>/<int:board_id>/<int:task_id>/assign",AssignTaskView.as_view()) #assigning task to user
]

