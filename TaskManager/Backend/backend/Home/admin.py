from django.contrib import admin
from Home.models import User,Board,Task,BoardUser
# Register your models here.
admin.site.register(User)
admin.site.register(Board)
admin.site.register(Task)
admin.site.register(BoardUser)