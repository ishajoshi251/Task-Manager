from rest_framework import status
from rest_framework.views import APIView,Response
from Home.models import User,Board,Task,BoardUser
from Home.serializers import UserSerializer
from django.contrib.auth.hashers import check_password


# Create your views here.
def boards():
    board=Board.objects.all()
    list=[]
    for i in board:
        dict={
            "board_id":i.board_id,
            "board_name":i.board_name,
        }
        list.append(dict)
    return list

def tasks(board_id,user_name):
    list=[]
    task=Task.objects.filter(board_id=board_id).all()
    for i in task:
        dict={}
        dict["task_id"]=i.task_id
        dict["task_name"]=i.task_name
        dict["task_status"]=i.task_status
        dict["task_desc"]=i.task_desc
        dict["time_stamp"]=i.time_stamp.strftime('%Y-%m-%d %H:%M:%S %Z')
        dict["assigned_to"]=i.assigned_to
        list.append(dict)
    for i in range (len(list)):
        if list[i]["assigned_to"]!=user_name and list[i]["assigned_to"]!="Not Assigned":
            list.insert(0,list.pop(i))
    for i in range (len(list)):
        if list[i]["assigned_to"]==user_name:
            list.insert(0,list.pop(i))
    return list

def usercheck(user_name,board_id):
    bool=False
    user_id=User.objects.filter(user_name=user_name).first().user_id
    val=BoardUser.objects.filter(user_id=user_id,board_id=board_id).all()
    if len(val)>0:
        bool=True
    return bool

class UserSignupView(APIView):
    def post(self,request):
        response={}
        if 'user_name' not in request.data:
            response['success']=False
            response['message']="Name required"
            return Response(response,status.HTTP_400_BAD_REQUEST)
        user_name=request.data['user_name'].strip()
        first_name=request.data['first_name'].strip()
        last_name=request.data['last_name'].strip()
        user_email=request.data['user_email'].strip()
        password=request.data['password']
        obj=User.objects.create(user_email=user_email,user_name=user_name,first_name=first_name,last_name=last_name,password=password)
        obj.save()
        response={
            "success": True,
            "message": "User added successfully"
        }
        return Response(response,status.HTTP_200_OK)
    
class UserLoginView(APIView):
    def post(self,request,user_name):
        response={}
        if 'user_name' not in request.data:
            response['success']=False
            response['message']='user name required'
            return Response(response,status.HTTP_400_BAD_REQUEST)
        user_name=request.data['user_name']
        password=request.data['password']
        user=User.objects.filter(user_name=user_name).first()
        if not user:
            response={
            "success": False,
            "message": "User does not exist",
        }
            return Response(response,status.HTTP_401_UNAUTHORIZED)
        if user_name == user.user_name and check_password(password, user.password):
            board_list=boards()
            data={
                "user_name": user_name,
                "board_list": board_list
            }
            response={
            "success": True,
            "message": "User successfully authenticated",
            "data": data,
        }   
            return Response(response,status.HTTP_200_OK)
        else:
            response={
            "success": False,
            "message": "Invalid credentials",
        }
            return Response(response,status.HTTP_401_UNAUTHORIZED)

    
class UserDashboardView(APIView):
    def get(self,request,user_name):
        board_list=boards()
        data={
            "user_name": user_name,
            "board_list": board_list
        }
        response={
        "success": True,
        "message": "User and board details send successfully",
        "data": data,
    }   
        return Response(response,status.HTTP_200_OK)

class AddUsertoBoard(APIView):
    def get(self,request,user_name,board_id):
        response={}
        if usercheck(user_name=user_name,board_id=board_id):
            board_list=boards()
            task_list=tasks(board_id,user_name)
            bool=usercheck(user_name=user_name,board_id=board_id)
            data={
                    "user_name": user_name,
                    "board_id": board_id,
                    "board_list": board_list,
                    "task_list": task_list,
                    "bool": bool
                }
            response={
                "success": True,
                "message": "User already joined in board",
                "data":data
            }
            return Response(response,status.HTTP_200_OK)
        user_id=User.objects.filter(user_name=user_name).first().user_id
        BoardUser.objects.create(user_id=user_id,board_id=board_id)
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
                "user_name": user_name,
                "board_id": board_id,
                "board_list": board_list,
                "task_list": task_list,
                "bool": bool
            }
        response={
            "success": True,
            "message": "User joined board",
            "data":data
        }
        return Response(response,status.HTTP_200_OK)

class AddTaskView(APIView):
    def post(self,request,user_name,board_id):
        response={}
        if 'task_name' not in request.data:
            response['success']=False
            response['message']="Need task name"
            return Response(response,status.HTTP_400_BAD_REQUEST)
        task_name=request.data['task_name'].strip()
        task_desc=request.data['task_desc']
        task_status="To Do"
        assigned_to="Not assigned"
        Task.objects.create(task_name=task_name,task_desc=task_desc,task_status=task_status,board_id=board_id,assigned_to=assigned_to)
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
                "user_name": user_name,
                "board_id":board_id,
                "board_list":board_list,
                "task_list": task_list,
                "bool": bool
            }
        response={
            "success": True,
            "message": "Task Added Successfully",
            "data":data
        }
        return Response(response,status.HTTP_200_OK)
        
class AddBoardView(APIView):
    def post(self,request,user_name):
        response={}
        if 'board_name' not in request.data:
            response['success']=False
            response['message']="Need board name"
        board_name=request.data['board_name'].strip()
        Board.objects.create(board_name=board_name)
        board_list=boards()
        data={
                "user_name": user_name,
                "board_list": board_list
            }
        response={
            "success": True,
            "message": "Board added successfully",
            "data": data
        }
        return Response(response,status.HTTP_200_OK)

class BoardDetailsView(APIView):
    def get(self,request,user_name,board_id):
        response={}
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
            "user_name":user_name,
            "board_id": board_id,
            "board_list": board_list,
            "task_list": task_list,
            "bool":bool
        }
        response={
            "success": True,
            "message": "Task details send successfully",
            "data": data
        }
        return Response(response,status.HTTP_200_OK)

class PeopleView(APIView):
    def get(Self,request,board_id,user_name):
        response={}
        user_list=[]
        user=BoardUser.objects.filter(board=board_id).all()
        for i in user:
            user={}
            user_name=User.objects.filter(user_id=i.user_id).all()[0].user_name
            user["user_name"]=user_name
            user_list.append(user)
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
            "user_name":user_name,
            "board_id": board_id,
            "user_list": user_list,
            "task_list": task_list,
            "board_list": board_list,
            "bool":bool
        }
        response={
            "success": True,
            "message": "User details send successfully",
            "data": data
        }
        return Response(response,status.HTTP_200_OK)

class ChangeTaskStatusView(APIView):
    def put(self,request,user_name,board_id,task_id):
        response={}
        task=Task.objects.filter(task_id=task_id).first()
        task.task_status=request.data["task_status"]
        task.save()
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
            "user_name": user_name,
            "board_id": board_id,
            "board_list": board_list,
            "task_list": task_list,
            "bool":bool
        }
        response={
            "success": True,
            "message": "Task status changed successfully",
            "data": data
        }
        return Response(response,status.HTTP_200_OK)
    
class AssignTaskView(APIView):
    def put(self,request,user_name,board_id,task_id):
        response={}
        task=Task.objects.filter(task_id=task_id).first()
        task.assigned_to=user_name
        task.save()
        board_list=boards()
        task_list=tasks(board_id,user_name)
        bool=usercheck(user_name=user_name,board_id=board_id)
        data={
            "user_name": user_name,
            "board_id": board_id,
            "board_list": board_list,
            "task_list": task_list,
            "bool":bool
        }
        response={
            "success": True,
            "message": "Task assigned successfully",
            "data": data
        }
        return Response(response,status.HTTP_200_OK)