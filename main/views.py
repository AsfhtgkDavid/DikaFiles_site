import mimetypes

from django.conf import settings
from django.http import HttpRequest, HttpResponseBadRequest, HttpResponse, Http404
from django.shortcuts import render

from main.models import AppFile


# Create your views here.
def index(request: HttpRequest):
    return render(request, "main/index.html")


def download(request: HttpRequest):
    return render(request, "main/download.html")

def download_api(request: HttpRequest):
    if request.method == 'GET':
        params = request.GET
    else:
        params = request.POST

    if len(params) != 2: return HttpResponseBadRequest('Bad arguments')
    platform = params.get("platform")
    version = params.get("version")

    if not (platform and version): return HttpResponseBadRequest('Bad arguments')

    try:
        filename = AppFile.objects.filter(platform=platform, version=version).get().file.name.split('files/')[1]
    except:
        raise Http404
    filepath = settings.BASE_DIR.as_posix() + '/files/' + filename
    path = open(filepath, 'rb')
    mime_type, _ = mimetypes.guess_type(filepath)
    response = HttpResponse(path, content_type=mime_type)
    response['Content-Disposition'] = "attachment; \"filename=%s\"" % filename.split("/")[-1]
    return response

    return HttpResponse(f"{platform}:{version}")