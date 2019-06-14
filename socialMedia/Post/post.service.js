angular.module('socialMedia.post')
  .service('postService', ['Restangular',
    function postService(Restangular) {
      this.createPost = function createPost(text, visibilityStatus, file) {
        // eslint-disable-next-line no-undef
        const fileFormData = new FormData();
        fileFormData.append('content_text', text);
        fileFormData.append('visibility', visibilityStatus);
        fileFormData.append('content_image', file);
        return Restangular.all('/post/').customPOST(
          fileFormData, '', undefined, {
            'Content-Type': undefined,
          },
        );
      };
      this.getPosts = function getPosts() {
        return Restangular.oneUrl('/post/list').get();
      };
    }]);
