from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        with transaction.atomic():
            # Clear existing data
            Leaderboard.objects.all().delete()
            Activity.objects.all().delete()
            Workout.objects.all().delete()
            Team.objects.all().delete()
            User.objects.all().delete()

            # Teams
            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            # Users
            users = [
                User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
                User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', team=marvel),
                User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
                User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
            ]

            # Workouts
            workout1 = Workout.objects.create(name='Pushups', description='Upper body strength')
            workout2 = Workout.objects.create(name='Running', description='Cardio endurance')

            # Activities
            Activity.objects.create(user=users[0], workout=workout1, duration=30)
            Activity.objects.create(user=users[1], workout=workout2, duration=45)
            Activity.objects.create(user=users[2], workout=workout1, duration=20)
            Activity.objects.create(user=users[3], workout=workout2, duration=60)

            # Leaderboard
            Leaderboard.objects.create(user=users[0], score=100)
            Leaderboard.objects.create(user=users[1], score=80)
            Leaderboard.objects.create(user=users[2], score=90)
            Leaderboard.objects.create(user=users[3], score=110)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
